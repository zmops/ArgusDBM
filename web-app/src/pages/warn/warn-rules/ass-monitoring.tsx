import cloneDeep from 'lodash/cloneDeep';
import { defineComponent } from 'vue';
import { ApiMonitorRelated, ApiMonitorUnrelated, appliesMonitors, getAlertDefineMonitors, getMonitors, } from '@/service/api';
import { Props } from '@/pages/shared';

const defaultQueryParams = {
  ids: [],
  app: '',
  name: '',
  host: '',
  status: 9,
  sort: 'name',
  order: 'desc',
  pageIndex: 0,
  pageSize: 1000
};

const tableColumns = [
  {
    title: '监控名称',
    dataIndex: 'name',
  },
  {
    title: '监控Host',
    dataIndex: 'host',
  },
  {
    title: '标签',
    slotName: 'tags',
  },
  {
    title: '状态',
    slotName: 'status',
  }
];

export default defineComponent({
  name: 'WarnRulesEdit',
  props: Props,
  emits: ['update:visible'],
  setup(props, { emit }) {

    // 现在接口没数据，不知道类型
    const leftTable = ref<any>([]);
    const rightTable = ref<any>([]);
    const leftSelections = ref<Array<string | number>>([]);
    const rightSelections = ref<Array<string | number>>([]);

    const Message = useMessage();

    const rowSelection = reactive({
      type: 'checkbox',
      showCheckedAll: true,
      checkStrictly: true,
      defaultSelectedRowKeys: []
    });
    const handleLeftSelectionChange = (selection: Array<string | number>) => {
      leftSelections.value = selection;
    };
    const handleRightSelectionChange = (selection: Array<string | number>) => {
      leftSelections.value = selection;
    };

    const moveRight = () => {
      rightSelections.value.forEach((item) => {
        leftTable.value = leftTable.value.filter(i => i.id !== item);
        rightTable.value.push(item);
      });
    };

    const moveLeft = () => {
      leftSelections.value.forEach((item) => {
        rightTable.value = rightTable.value.filter(i => i.id !== item);
        leftTable.value.push(item);
      });
    };

    const handleCancel = () => {
      emit('update:visible', false);
    };
    const handleOk = () => {

      // 保存数据
      const data: Array<{ alertDefineId: string | number; monitorId: string }> = [];
      rightTable.value.forEach((item) => {
        data.push({
          alertDefineId: props.editId,
          monitorId: item.id
        });
      });
      appliesMonitors(props.editId, data).then((res) => {
        if (res.code === 0) {
          Message.success(t('message.success'));
          emit('update:visible', false);
        }
      });
    };
    const getData = () => {
      ApiMonitorUnrelated(props.editApp, props.editId).then((res) => {
        console.log(res);

        if (res.code !== 0 || !res.data) {
          return;
        }

        leftTable.value = res.data;

      });

      ApiMonitorRelated(props.editId).then((res) => {
        if (res.code !== 0 || !res.data) {
          return;
        }
        rightTable.value = res.data;
      });

    };
    watch(() => props.editId, (val) => {

      if (props.visible) {
        getData();
      }
    });

    return () => (
      <div>
        <a-modal v-model:visible={props.visible} width="1200px" onOk={handleOk} onCancel={handleCancel} v-slots={{
          title: () => t('warnRules.dialog.title')
        }}
        >
          <div class="flex flex-nowrap">
            <div class="w-45%">
              <div class="mb-base font-bold">关联监控待选区</div>
              <a-table columns={tableColumns} class="mt-base flex-1" row-key="id" row-selection={rowSelection} onSelectionChange={handleLeftSelectionChange} pagination={false} data={leftTable.value} v-slots={
                {
                  tags: (scope) => {
                    return (
                      <div>
                        {scope.record.tags.map((item: any) => {
                          return (
                            <a-tag color={item.color || 'blue'} class="mr-base">{item.value}</a-tag>
                          );
                        })}
                      </div>
                    );
                  },
                  status: (scope) => {
                    return (
                      <a-tag color={scope.record.status === 1 ? 'green' : 'red'}>{scope.record.status === 1 ? '正常' : '异常'}</a-tag>
                    );
                  }
                }
              }>
              </a-table>
            </div>
            <div class="w-10%">
              <div class="h-full column flex-center">
                <a-button
                  type="primary"
                  disabled={leftSelections.value.length === 0}
                  onClick={moveRight}
                  v-slots={{
                    icon: () => <icon-right />
                  }}
                ></a-button>
                <a-button type="primary" class="mt-base"
                  disabled={rightSelections.value.length === 0}
                  onClick={moveLeft}
                  v-slots={{
                    icon: () => <icon-left />
                  }}></a-button>
              </div>

            </div>
            <div class="w-45%">
              <div class="mb-base font-bold">关联监控已选区</div>
              <a-table columns={tableColumns} class="mt-base flex-1" row-key="id" row-selection={rowSelection} onSelectionChange={handleRightSelectionChange} pagination={false} data={rightTable.value} v-slots={
                             {
                               tags: (scope) => {
                                 return (
                                  <div>
                                    {scope.record.tags.map((item: any) => {
                                      return (
                                        <a-tag color={item.color || 'blue'} class="mr-base">{item.value}</a-tag>
                                      );
                                    })}
                                  </div>
                                 );
                               },
                               status: (scope) => {
                                 return (
                                  <a-tag color={scope.record.status === 1 ? 'green' : 'red'}>{scope.record.status === 1 ? '正常' : '异常'}</a-tag>
                                 );
                               }
                             }
              }>
              </a-table>
            </div>
          </div>
        </a-modal>
      </div >
    );
  }
});
