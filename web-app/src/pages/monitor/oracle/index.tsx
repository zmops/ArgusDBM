import type { FormInstance } from '@arco-design/web-vue';
import cloneDeep from 'lodash/cloneDeep';
import { defineComponent, watch } from 'vue';
import OracleAdd from './edit';
import { MONITORS_STATUS } from '@/utils/constants';
import { ApiMonitorManageDelete, ApiMonitorManageOpen, delMonitors, getMonitors } from '@/service/api';
import router from '@/router';
import { filterParams } from '@/utils';

const defaultQueryParams = {
  ids: [],
  app: 'oracle',
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
    title: t('tableView.operate'),
    slotName: 'buttons',
    width: 100,
  }
];

export default defineComponent({
  name: 'Oracle',
  setup() {

    const rowSelection = reactive({
      type: 'checkbox',
      showCheckedAll: true,
      checkStrictly: true,
      defaultSelectedRowKeys: []
    });

    const searchForm = reactive(cloneDeep(defaultQueryParams));
    const backUpForm = cloneDeep(searchForm);

    const formRef = ref<FormInstance>();

    const tableData = ref([]);
    const total = ref(0);
    const visible = ref<boolean>(false);
    const selections = ref<Array<string | number>>([]);

    const editId = ref<string | number>();

    const Message = useMessage();

    const handleRest = () => {
      formRef.value?.resetFields();
      searchForm.status = backUpForm.status;
      searchForm.name = backUpForm.name;
      searchForm.ip = backUpForm.ip;
    };

    const getData = () => {
      const params = filterParams(searchForm);
      params.status = params.status.split('_');
      getMonitors(params).then((res) => {
        if (res.data) {
          total.value = res.data.totalElements;
          tableData.value = res.data.content;

        }
      });
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
    const handleEditClick = (record: any)=>{
      editId.value = record.id;
      visible.value = true;
    };
    const handleNameClick = (monitorId)=>{
      router.push({
        name: 'monitorDetail',
        query: {
          monitorId,
          type: 'oracle'
        }
      });
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
        <OracleAdd v-model:visible={visible.value} type="oracle" editId={editId.value}></OracleAdd>
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
              <a-input class="ml-md w-160px!" v-model={searchForm.ip} placeholder={t('input.placeholder')}></a-input>
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
            name: (scope: any) => <a class="cursor-pointer text-blue" onClick={()=>handleNameClick(scope.record.id)}>{scope.record.name}</a>,
            status: (scope: any) => {
              const status = scope.record.status;
              return <a-tag color={status === 1 ? 'green' : 'red'}>{
                  status === 1 ? t('tableView.enable') : status === 0 ? t('tableView.disable') : t('tableView.offline')
              }</a-tag>;
            },
            buttons: (scope: any) => {
              return <a-button type="text" onClick={() => handleEditClick(scope.record)}>{t('tableView.edit')}</a-button>;
            }
          }} />
        </div>
      </div >
    );
  },
});
