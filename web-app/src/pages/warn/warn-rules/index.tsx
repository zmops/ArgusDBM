import type { FormInstance } from '@arco-design/web-vue';
import cloneDeep from 'lodash/cloneDeep';
import { defineComponent, watch } from 'vue';

import Edit from './operate';
import AssMonitoring from './ass-monitoring';
import { WARN_LEVEL } from '@/utils/constants';
import { delDefine, getDefine, getDefines, modifyDefine } from '@/service/api';
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

const columns = [{
  title: t('warnRules.form.field'),
  slotName: 'field'
},
{
  title: t('warnRules.form.expr'),
  dataIndex: 'expr'
},
{
  title: t('warnRules.form.priority'),
  slotName: 'priority'
},
{
  title: t('warnRules.form.times'),
  dataIndex: 'times'
},
{
  title: t('warnRules.form.template'),
  dataIndex: 'template'
},
{
  title: t('warnRules.form.preset'),
  slotName: 'preset',

},
{
  title: t('warnRules.form.enable'),
  slotName: 'enable',

},
{
  title: t('tableView.operate'),
  slotName: 'buttons',
}
];
export default defineComponent({
  name: 'WarnRules',
  setup() {

    const rowSelection = reactive({
      type: 'checkbox',
      showCheckedAll: true,
      checkStrictly: true,
      defaultSelectedRowKeys: []
    });

    const queryParams = reactive(cloneDeep(defaultQueryParams));
    const searchForm = reactive<{ priority?: number; status?: number; content: string }>({
      priority: undefined,
      status: undefined,
      content: '',
    });
    const Message = useMessage();
    const backUpForm = cloneDeep(searchForm);

    const formRef = ref<FormInstance>();

    const visible = ref<boolean>(false);
    const assVisible = ref<boolean>(false);

    const tableData = ref([]);
    const total = ref(0);
    const loading = ref(false);
    const selections = ref<Array<string | number>>([]);

    const editId = ref<string | number>();
    const editApp = ref<string | number>();

    const handleRest = () => {
      formRef.value?.resetFields();
      searchForm.status = backUpForm.status;
      searchForm.priority = backUpForm.priority;
      searchForm.content = backUpForm.content;
    };

    const getData = () => {
      loading.value = true;
      const params = filterParams({ ...queryParams, ...searchForm }, ['status', 'priority'], true, -1);
      getDefines(params).then((res) => {
        if (res.code === 0 && res.data) {
          tableData.value = res.data.content;
          total.value = res.data.totalElements;
          loading.value = false;
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
    const handleDelete = () => {
      delDefine(selections.value).then((res) => {
        if (res.code === 0) {
          Message?.success(res.statusText || '删除成功');
          getData();
        }
      });
    };

    const pageChange = (page: number) => {
      queryParams.pageIndex = page - 1;
      getData();
    };

    const handleEdit = (id: string | number) => {
      editId.value = id;
      visible.value = true;
    };

    const handleChangepreset = (id, v, filed) => {
      // 根据ID获取告警规则信息
      getDefine(id).then((res) => {
        if (res.code !== 0 || !res.data) {
          return;
        }
        const form = res.data;
        form[filed] = v;
        // 修改
        modifyDefine(form).then((res) => {
          if (res.code !== 0) {
            Message.error({
              content: t('message.error'),
            });
            return;
          }
          Message.success({
            content: t('message.success'),
          });
          getData();
        });
      });
    };

    return () => {
      return (
        <div class="h-full column overflow-y-auto bg-#F0F2F5 pa-base dark:bg-#333">
          <Edit v-model:visible={visible.value} editId={editId.value}></Edit>
          <AssMonitoring v-model:visible={assVisible.value} editId={editId.value} editApp={editApp.value}></AssMonitoring>
          <div class="flex flex-(shrink-0 nowrap) items-center bg-white px-md py-base dark:bg-dark">
            <a-form model={searchForm} ref={formRef} onSubmit={handleSubmit} class="table-search-form" layout="inline" auto-label-width={true}>
              <a-form-item field="status" label={t('alert.priority.title')}>
                <a-select class="ml-md w-130px!" default-value={-1} onChange={onlineStatusChange} v-model={searchForm.priority} type="button">
                  {WARN_LEVEL.map(item => (
                    <a-option value={item.key}>{item.value}</a-option>
                  ))}
                </a-select>
              </a-form-item>
              <a-form-item>
                <a-button html-type="submit" type="primary" class="mr-md">{t('alert.form.submit')}</a-button>
                <a-button html-type="reset" onClick={handleRest}>{t('alert.form.reset')}</a-button>
              </a-form-item>
            </a-form>
          </div>
          <div class="mt-base column flex-1 bg-white px-md py-base dark:bg-dark">
            <div class="flex flex-shrink-0 items-center">
              <a-button class="mr-md" onClick={() => visible.value = true} v-slots={{ icon: () => <i class="i-custom:list-add text-16px"></i>, }}>
                {t('tableView.add')}
              </a-button>
              <a-popconfirm content="是否确认删除选中的数据?" type="info" onOk={handleDelete}>
                <a-button class="mr-md" disabled={!selections.value.length} v-slots={{ icon: () => <i class="i-custom:list-del text-16px"></i>, }}>
                  {t('tableView.delete')}
                </a-button>
              </a-popconfirm>
            </div>
            <a-table class="mt-base flex-1" loading={loading.value} row-key="id" row-selection={rowSelection} columns={columns} onSelectionChange={handleSelectionChange} pagination={{ total: total.value, pageSize: 15, onChange: pageChange }} data={tableData.value}
              v-slots={{
                field: (scope) => {
                  const record = scope.record;
                  return record.app + '.' + record.metric + '.' + record.field;
                },
                priority: scope => WARN_LEVEL.find(wl => wl.key === scope.record.priority)?.value,
                preset: scope => <a-radio-group default-value={scope.record.preset} size="mini" type="button" onChange={v => handleChangepreset(scope.record.id, v, 'preset')}>
                  <a-radio value={true}>{t('notificationRules.table.presetleftText')}</a-radio>
                  <a-radio value={false}>{t('notificationRules.table.presetrightText')}</a-radio>
                </a-radio-group>,
                enable: scope => <a-radio-group default-value={scope.record.enable} size="mini" type="button" onChange={v => handleChangepreset(scope.record.id, v, 'enable')}>
                  <a-radio value={true}>{t('notificationRules.table.presetleftText')}</a-radio>
                  <a-radio value={false}>{t('notificationRules.table.presetrightText')}</a-radio>
                </a-radio-group>,
                buttons: scope => <div class="flex flex-shrink-0 items-center">
                  <a-button class="mr-md" type="text" size="small" onClick={() => { editId.value = scope.record.id;editApp.value = scope.record.app; assVisible.value = true; }}>
                    {t('buttons.unionMonitor')}
                  </a-button>
                  <a-button class="mr-md" type="text" size="small" danger onClick={() => handleEdit(scope.record.id)}>
                    {t('tableView.edit')}
                  </a-button>
                </div>
              }} />
          </div>
        </div>
      );
    };
  },
});
