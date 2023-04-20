import type { FormInstance } from '@arco-design/web-vue';
import cloneDeep from 'lodash/cloneDeep';
import { defineComponent, watch } from 'vue';
import { Monitors, getMonitorSummary } from '../mysql/shared';
import PgsqlAdd from './edit';
import { MONITORS_STATUS } from '@/utils/constants';
import { ApiMonitorManageDelete, ApiMonitorManageOpen, delMonitors, getMonitors } from '@/service/api';
import router from '@/router';
import { filterParams } from '@/utils';
import { secondsTransform } from '@/utils/seconds2time';

const defaultQueryParams = {
  ids: [],
  app: 'postgresql',
  name: '',
  host: '',
  status: '0_1_2_3',
  ip: '',
  sort: 'name',
  order: 'desc',
  online: 2,
  pageIndex: 0,
  pageSize: 15
};
const columns = [
  {
    title: t('tableView.monitoring'),
    slotName: 'name',
  },
  {
    title: t('tableView.ip'),
    dataIndex: 'host'
  },
  {
    title: t('tableView.stat'),
    slotName: 'status',
  },
  {
    title: '版本',
    dataIndex: 'basic_version'
  },
  {
    title: '运行时长',
    slotName: 'status_uptime'
  },
  {
    title: '活动连接数',
    dataIndex: 'connection_active'
  },
  {
    title: '获取',
    dataIndex: 'tuple_fetched'
  },
  {
    title: '返回',
    dataIndex: 'tuple_returned'
  },
  {
    title: '新增',
    dataIndex: 'tuple_inserted'
  },
  {
    title: '更新',
    dataIndex: 'tuple_updated'
  },
  {
    title: '删除',
    dataIndex: 'tuple_deleted'
  },
  {
    title: '提交',
    dataIndex: 'transactions_commits'
  },
  {
    title: '回滚',
    dataIndex: 'transactions_rollbacks'
  },
  {
    title: t('tableView.operate'),
    slotName: 'buttons',
    width: 100,
  },
];
export default defineComponent({
  name: 'Pgsql',
  setup() {

    const rowSelection = reactive({
      type: 'checkbox',
      showCheckedAll: true,
      checkStrictly: true,
      defaultSelectedRowKeys: []
    });

    const searchForm = reactive(cloneDeep(defaultQueryParams));

    const formRef = ref<FormInstance>();

    const tableData = ref<any[]>([]);
    const total = ref(0);
    const visible = ref<boolean>(false);
    const selections = ref<Array<string | number>>([]);

    const editId = ref<string | number>();

    const Message = useMessage();

    const handleRest = () => {
      formRef.value?.resetFields();
      searchForm.status = defaultQueryParams.status;
      searchForm.name = defaultQueryParams.name;
      searchForm.host = defaultQueryParams.host;
    };

    const getData = () => {
      const params = filterParams(searchForm);
      params.status = params.status.split('_');
      Monitors(params, tableData, total);
      getMonitorSummary(params, tableData);

    };
    watch(visible, (val) => {
      if (!val) {
        editId.value = '';
        getData();
      }
    });

    onMounted(() => {
      getData();
    });

    const radioGroupChange = (e: string) => {
      searchForm.status = e;
      getData();

    };

    const handleSubmit = () => {
      getData();
    };

    const handleAdd = () => {
      visible.value = true;
    };
    const handleSelectionChange = (selection: Array<string | number>)=>{
      selections.value = selection;
    };
    const handleDelete = () => {
      delMonitors(selections.value).then((res)=>{
        if (res.code === 0) {
          Message?.success(res.statusText || '删除成功');

          getData();
        }
      });
    };
    const handleNameClick = (monitorId)=>{
      router.push({
        name: 'monitorDetail',
        query: {
          monitorId,
          type: 'postgresql'
        }
      });
    };
    const handleEditClick = (record)=>{
      editId.value = record.id;
      visible.value = true;
    };

    const handleDisable = () => {
      ApiMonitorManageDelete(selections.value).then((res) => {
        if (res.code === 0) {
          Message?.success(res.statusText || '操作成功');
          getData();
        }
      });
    };
    const handleEnable = () => {

      ApiMonitorManageOpen(selections.value).then((res) => {
        if (res.code === 0) {
          Message?.success(res.statusText || '操作成功');
          getData();
        }
      });
    };

    return () => (
      <div class="h-full column overflow-y-auto bg-#F0F2F5 pa-base dark:bg-#333">
        <PgsqlAdd v-model:visible={visible.value} type="postgresql" editId={editId.value}></PgsqlAdd>
        <div class="flex flex-(shrink-0 nowrap) items-center bg-white px-md py-base dark:bg-dark">
          <a-form model={searchForm} ref={formRef} onSubmit={handleSubmit} class="table-search-form" layout="inline" auto-label-width={true}>
            <a-form-item field="status" label={t('alert.status.title')} row-class="mb-0!">
              <a-radio-group class="ml-md" default-value="0_1_2_3" onChange={radioGroupChange} type="button">
                {
                  MONITORS_STATUS.map(item => (
                    <a-radio value={item.key}>{item.value}</a-radio>
                  ))
                }
              </a-radio-group>
            </a-form-item>

            <a-form-item field="status" label={t('alert.name')} >
              <a-input class="ml-md w-160px!" v-model={searchForm.name} placeholder={t('input.placeholder')}></a-input>
            </a-form-item>
            <a-form-item field="status" label={t('alert.ip')} >
              <a-input class="ml-md w-160px!" v-model={searchForm.host} placeholder={t('input.placeholder')}></a-input>
            </a-form-item>
            <a-form-item >
              <a-button html-type="submit" type="primary" class="mr-md">{t('alert.form.submit')}</a-button>
              <a-button html-type="reset" onClick={handleRest}>{t('alert.form.reset')}</a-button>
            </a-form-item>
          </a-form>
        </div>
        <div class="mt-base column flex-1 bg-white px-md py-base dark:bg-dark">
          <div class="flex flex-shrink-0 items-center">
            <a-button class="mr-md" v-slots={{ icon: () => <i class="i-custom:list-add"></i>, }} onClick={handleAdd}>
              {t('tableView.add')}
            </a-button>
            <a-popconfirm content="是否确认删除选中的数据?" type="info" onOk={handleDelete}>
            <a-button class="mr-md" disabled={!selections.value.length} v-slots={{ icon: () => <i class="i-custom:list-del"></i>, }} >
              {t('tableView.delete')}
            </a-button>
            </a-popconfirm>
            <a-popconfirm content={t('message.disableTips')} type="info" onOk={handleDisable}>
              <a-button class="mr-md" disabled={!selections.value.length} v-slots={{ icon: () => <i class="i-custom:disable text-20px"></i>, }} >
                {t('tableView.disable')}
              </a-button>
            </a-popconfirm>
            <a-popconfirm content="是否启用数据项" type="info" onOk={handleEnable}>
              <a-button class="mr-md" disabled={!selections.value.length} v-slots={{ icon: () => <i class="i-custom:enable text-(18px blue)"></i>, }} >
              启用
              </a-button>
            </a-popconfirm>
          </div>
          <a-table class="mt-base flex-1" row-key="id" row-selection={rowSelection} columns={columns} onSelectionChange={handleSelectionChange} pagination={{ total: total.value }} data={tableData.value}
          v-slots={{
            name: scope => <a class="cursor-pointer text-blue" onClick={()=>handleNameClick(scope.record.id)} >{scope.record.name}</a>,
            status: (scope) => {
              const status = scope.record.status;
              return <a-tag color={status === 1 ? 'green' : 'red'}>{
                  status === 1 ? t('tableView.enable') : status === 0 ? t('tableView.disable') : t('tableView.offline')
              }</a-tag>;
            },
            status_uptime: (scope) => {
              return secondsTransform(scope.record.status_uptime);
            },
            performance_qps: (scope) => {
              const qps = scope.record.performance_qps;
              return qps ? qps + '次/s' : '';
            },
            buttons: (scope) => {
              return <a-button type="text" onClick={() => handleEditClick(scope.record)}>{t('tableView.edit')}</a-button>;
            }
          }} />
        </div>
      </div >
    );
  },
});
