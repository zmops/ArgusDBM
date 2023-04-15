import type { FormInstance } from '@arco-design/web-vue';
import cloneDeep from 'lodash/cloneDeep';
import { defineComponent, watch } from 'vue';
import { ALARM_HANDLES, WARN_LEVEL } from '@/utils/constants';
import { clearAlerts, delAlerts, getAlerts, putStatus } from '@/service/api';
import router from '@/router';
import { filterParams } from '@/utils';

const defaultQueryParams = {
  ids: [],
  monitorId: '',
  priority: undefined,
  status: undefined,
  content: '',
  sort: '',
  order: 'desc',
  pageIndex: 0,
  pageSize: 15
};

export default defineComponent({
  name: 'WarnInfo',
  setup() {

    const rowSelection = reactive({
      type: 'checkbox',
      showCheckedAll: true,
      checkStrictly: true,
      defaultSelectedRowKeys: []
    });
    const columns = [{
      title: t('tableView.underMonitoring'),
      dataIndex: 'tags.monitorName',
      slotName: 'monitorName'
    }, {
      title: t('tableView.alarmLevel'),
      slotName: 'priority'
    },
    {
      title: t('tableView.processingStatus'),
      slotName: 'status'
    },
    {
      title: t('tableView.alarmTime'),
      dataIndex: 'gmtUpdate'
    },
    {
      title: t('tableView.alarmContent'),
      dataIndex: 'content'
    }
    ];
    const queryParams = reactive(cloneDeep(defaultQueryParams));
    const searchForm = reactive<{ priority?: number; status?: number; content: string }>({
      priority: undefined,
      status: undefined,
      content: '',
    });

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
      searchForm.priority = backUpForm.priority;
      searchForm.content = backUpForm.content;
    };

    const getData = () => {
      const params = filterParams({ ...queryParams, ...searchForm }, ['status', 'priority'], true, -1);
      getAlerts(params).then((res) => {
        if (res.code === 0 && res.data) {
          tableData.value = res.data.content;
          total.value = res.data.totalElements;
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

    const radioGroupChange = (e: number) => {
      searchForm.status = e;
      getData();

    };
    const onlineStatusChange = (e: number) => {
      searchForm.priority = e;
      getData();
    };

    const handleSubmit = () => {
      getData();
    };

    const handleSelectionChange = (selection: Array<string | number>) => {
      selections.value = selection;
    };

    const pageChange = (page: number) => {
      queryParams.pageIndex = page - 1;
      getData();
    };

    const handleChange = (value: number) => {
      const ids = selections.value;

      putStatus(value, ids).then((res) => {
        if (res.code === 0) {
          Message?.success(res.statusText || '操作成功');
          getData();
        }
      });

    };

    const handleProcessed = () => {
      handleChange(3);
    };
    const handleUntreated = () => {
      handleChange(0);
    };

    const handleDelete = () => {
      delAlerts(selections.value).then((res) => {
        if (res.code === 0) {
          Message?.success(res.statusText || '删除成功');
          getData();
        }
      });
    };

    const handleClear = () => {
      clearAlerts().then((res) => {
        if (res.code === 0) {
          Message?.success(res.statusText || '清除成功');
        }
      });
    };

    return () => {
      return (
        <div class="h-full column overflow-y-auto bg-#F0F2F5 pa-base dark:bg-#333">
          <div class="flex flex-(shrink-0 nowrap) items-center bg-white px-md py-base dark:bg-dark">
            <a-form model={searchForm} ref={formRef} onSubmit={handleSubmit} class="table-search-form" layout="inline" auto-label-width={true}>
              <a-form-item field="status" label={t('alert.status.title')} row-class="mb-0!">
                <a-radio-group class="ml-md" default-value={-1} v-model={searchForm.status} onChange={radioGroupChange} type="button">
                  {ALARM_HANDLES.map(item => (
                    <a-radio value={item.key}>{item.value}</a-radio>
                  ))}
                </a-radio-group>
              </a-form-item>
              <a-form-item field="status" label={t('alert.priority.title')}>
                <a-radio-group class="ml-md" default-value={-1} onChange={onlineStatusChange} v-model={searchForm.priority} type="button">
                  {WARN_LEVEL.map(item => (
                    <a-radio value={item.key}>{item.value}</a-radio>
                  ))}
                </a-radio-group>
              </a-form-item>
              <a-form-item field="status" label={t('alert.form.content.title')}>
                <a-input class="ml-md w-160px!" v-model={searchForm.content} placeholder={t('alert.form.content.placeholder')}></a-input>
              </a-form-item>
              <a-form-item>
                <a-button html-type="submit" type="primary" class="mr-md">{t('alert.form.submit')}</a-button>
                <a-button html-type="reset" onClick={handleRest}>{t('alert.form.reset')}</a-button>
              </a-form-item>
            </a-form>

          </div>
          <div class="mt-base column flex-1 bg-white px-md py-base dark:bg-dark">
            <div class="flex flex-shrink-0 items-center">
              <a-popconfirm content={t('message.markupTips')} type="info" onOk={handleProcessed}>
                <a-button class="mr-md" disabled={!selections.value.length} v-slots={{ icon: () => <i class="i-custom:processed"></i>, }}>
                  {t('tableView.mark.processed')}
                </a-button>
              </a-popconfirm>

              <a-popconfirm content={t('message.markdownTips')} type="info" onOk={handleUntreated}>
                <a-button class="mr-md" disabled={!selections.value.length} v-slots={{ icon: () => <i class="i-custom:untreated"></i>, }}>
                  {t('tableView.mark.unprocessed')}
                </a-button>
              </a-popconfirm>
              <a-popconfirm content={t('message.deleteTips')} type="info" onOk={handleDelete}>
                <a-button class="mr-md" disabled={!selections.value.length} v-slots={{ icon: () => <i class="i-custom:list-del"></i>, }}>
                  {t('tableView.delete')}
                </a-button>
              </a-popconfirm>
              <a-popconfirm content={t('message.clearTips')} type="info" onOk={handleClear}>
                <a-button class="mr-md" v-slots={{ icon: () => <i class="i-custom:clear"></i>, }}>
                  {t('tableView.mark.clear')}
                </a-button>
              </a-popconfirm>
            </div>
            <a-table class="mt-base flex-1" row-key="id" row-selection={rowSelection} columns={columns} onSelectionChange={handleSelectionChange} pagination={{ total: total.value, pageSize: 15, onChange: pageChange }} data={tableData.value}
              v-slots={{
                monitorName: scope => <a class="cursor-pointer text-blue" onClick={() => router.push({ name: 'monitorDetail', query: { monitorId: scope.record.id, type: 'mysql' } })}>{scope.record.tags.monitorName}</a>,
                priority: scope => WARN_LEVEL.find(wl => wl.key === scope.record.priority)?.value,
                status: scope => <a-tag color={scope.record.status === 3 ? 'green' : 'red'}>{scope.record.status ? t('alert.status.3') : t('alert.status.0')}</a-tag>,
              }} />
          </div>
        </div>
      );
    };
  },
});
