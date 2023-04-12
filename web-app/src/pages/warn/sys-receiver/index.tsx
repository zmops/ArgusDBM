import type { FormInstance } from '@arco-design/web-vue';
import cloneDeep from 'lodash/cloneDeep';
import { defineComponent, watch } from 'vue';
import Edit from './operate';
import { NOTICE_TYPE } from '@/utils/constants';
import { delReceivers, getReceivers } from '@/service/api';
import { filterParams } from '@/utils';
import type { sysInterface } from '@/service/api/interface';

export default defineComponent({
  name: 'NotifyRules',
  setup() {
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
    const rowSelection = reactive({
      type: 'checkbox',
      showCheckedAll: true,
      checkStrictly: true,
      defaultSelectedRowKeys: []
    });
    const columns = [{
      title: t('sysReceiver.form.name'),
      dataIndex: 'name'
    },
    {
      title: t('sysReceiver.form.type'),
      slotName: 'type'
    },

    {
      title: t('sysReceiver.form.gmtUpdate'),
      dataIndex: 'gmtUpdate'
    },
    {
      title: t('tableView.operate'),
      slotName: 'buttons',
      width: 100
    }
    ];
    const queryParams = reactive(cloneDeep(defaultQueryParams));
    const searchForm = reactive<{ name: string }>({
      name: '',
    });

    const backUpForm = cloneDeep(searchForm);

    const formRef = ref<FormInstance>();

    const tableData = ref<sysInterface[]>([]);
    const total = ref(0);
    const visible = ref<boolean>(false);
    const selections = ref<Array<string | number>>([]);

    const editId = ref<string | number>();

    const Message = useMessage();

    const handleRest = () => {
      formRef.value?.resetFields();
      searchForm.name = backUpForm.name;

    };

    const getData = () => {
      const params = filterParams({ ...queryParams, ...searchForm }, ['status', 'priority'], true, -1);
      getReceivers(params).then((res) => {
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

    const handleSubmit = () => {
      getData();
    };

    const handleSelectionChange = (selection: Array<string | number>) => {
      selections.value = selection;
    };
    const handleDelete = () => {
      delReceivers(selections.value).then((res) => {
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
    return () => {
      return (
        <div class="h-full column overflow-y-auto bg-#F0F2F5 pa-base dark:bg-#333">
          <Edit v-model:visible={visible.value} editId={editId.value}></Edit>
          <div class="flex flex-(shrink-0 nowrap) items-center bg-white px-md py-base dark:bg-dark">
            <a-form model={searchForm} ref={formRef} onSubmit={handleSubmit} class="table-search-form" layout="inline" auto-title-width={true}>
              <a-form-item title={t('notificationRules.form.name')}>
                <a-input v-model={searchForm.name} placeholder={t('notificationRules.form.name_placeholder')}></a-input>
              </a-form-item>
              <a-form-item>
                <a-button html-type="submit" type="primary" class="mr-md">{t('alert.form.submit')}</a-button>
                <a-button html-type="reset" onClick={handleRest}>{t('alert.form.reset')}</a-button>
              </a-form-item>
            </a-form>
          </div>
          <div class="mt-base column flex-1 bg-white px-md py-base dark:bg-dark">
            <div class="flex flex-shrink-0 items-center">
              <a-button class="mr-md" onClick={() => visible.value = true} v-slots={{ icon: () => <i class="i-custom:processed"></i>, }}>
                {t('tableView.add')}
              </a-button>
              <a-popconfirm content="是否确认删除选中的数据?" type="info" onOk={handleDelete}>
                <a-button class="mr-md" disabled={!selections.value.length} v-slots={{ icon: () => <i class="i-custom:list-del"></i>, }}>
                  {t('tableView.delete')}
                </a-button>
              </a-popconfirm>
            </div>
            <a-table class="mt-base flex-1" table-layout-fixed row-key="id" row-selection={rowSelection} columns={columns} onSelectionChange={handleSelectionChange} pagination={{ total: total.value, pageSize: 15, onChange: pageChange }} data={tableData.value}
              v-slots={{
                type: (scope: any) => {

                  const type = scope.record.type || [];

                  return type.map((item: number) => {
                    return NOTICE_TYPE.find(i => i.key === item)?.value || '';
                  }).join(',');

                },
                buttons: (scope: any) => <div class="flex flex-shrink-0 items-center">
                  <a-button class="mr-md" type="text" size="small" danger onClick={() =>{ visible.value = true;editId.value = scope.record.id; }}>
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
