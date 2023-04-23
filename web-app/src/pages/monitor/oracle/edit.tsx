import cloneDeep from 'lodash/cloneDeep';
import { defineComponent } from 'vue';
import type { FormInstance } from '@arco-design/web-vue';
import type { formParamItem } from '../../shared';
import { nameRules, Props, defaultFormData } from '../../shared';
import { addMonitor, getAppParams, getMonitor, modifyMonitor } from '@/service/api';
import { parseStrEmpty } from '@/utils';

export default defineComponent({
  name: 'OracleAdd',
  props: Props,
  emits: ['update:visible'],
  setup(props, { emit }) {

    const form = reactive(cloneDeep(defaultFormData));
    const formRef = ref<FormInstance>();
    const Message = useMessage();

    const formatSaveData = () => {
      const data = Object.assign({}, form);
      data.params = [];
      data.monitor.app = props.type;
      form.params.forEach((item) => {
        if (item.field === 'host') {
          form.monitor.host = parseStrEmpty(item.value);
        }
        const param = {
          field: item.field,
          value: parseStrEmpty(item.value)
        };
        data.params.push(param);
      });
      return data;
    };
    const reset = () => {
      formRef.value?.resetFields();
      form.monitor = cloneDeep(defaultFormData.monitor);
      form.params.forEach((item) => {
        item.value = item.defaultValue;
      });
    };
    const handleOk = () => {

      formRef.value?.validate((valid) => {
        if (valid) {
          return false;
        }
        const saveData = formatSaveData();

        (props.editId ? modifyMonitor : addMonitor)(saveData).then((res) => {

          if (res.code !== 0) {
            Message.error({
              content: res.statusText || '操作失败',
            });
            return;
          }
          Message?.success({
            content: props.editId ? '更新成功' : '新建成功',
          });

          reset();
          emit('update:visible', false);

        });

      });

    };
    const handleCancel = () => {
      reset();
      emit('update:visible', false);
    };
    watch(() => props.editId, (val) => {
      if (!val) {
        return;
      }
      getMonitor(val).then((res) => {
        if (res.code !== 0 || !res.data) {
          return;
        }
        const data = res.data;
        Object.keys(data).forEach((key) => {
          if (key === 'params') {
            data[key].forEach((item) => {
              form.params.forEach((param) => {
                if (param.field === item.field) {
                  param.value = item.value;
                }
              });
            });
          } else {
            form[key as keyof typeof form] = data[key];
          }
        }
        );
      });
    });
    onMounted(() => {
      getAppParams(props.type).then((res) => {
        const params = res.data as formParamItem[];
        params.forEach((item) => {
          item.value = item.defaultValue;
        });
        form.params = res.data as formParamItem[];
      });
    });
    return () => (
      <div>
        <a-modal v-model:visible={props.visible} width="700px" onOk={handleOk} onCancel={handleCancel} v-slots={{
          title: () => `${props.editId ? '修改' : '新增'}${props.type}监控`
        }} >
          <a-form model={form} ref={formRef}>
            <a-form-item label="监控名称" field="monitor.name" rule={nameRules} required v-slots={{
              help: () => <div style="font-size: 12px;color: #757D8F">
                <i class="a-icon-info" style="color: #5A98EC"/>标识监控的名称,名称需要保证唯一性
              </div>
            }} >
              <a-input v-model={form.monitor.name} placeholder="标识监控的名称,名称需要保证唯一性"/>
            </a-form-item>
            {
              form && form.params && form.params.length > 0 && (
                form.params.map((item, index) => {
                  return (
                    <a-form-item
                      required={item.required}
                      key={'params.' + index + '.value'}
                      label={item.name ? item.name['zh-CN'] : ''}
                      field={'params.' + index + '.value'}
                      validate-trigger={['change', 'input']}
                      rules={[{ required: item.required, message: `${item.name ? item.name['zh-CN'] : ''}是必填项` }]}
                    >
                      <a-input v-model={item.value} placeholder={item.placeholder}/>
                    </a-form-item>
                  );
                })
              )
            }
            <a-form-item label="采集间隔(秒)" v-slots={{
              help: () => <div style="font-size: 12px;color: #757D8F">
                <i class="a-icon-info" style="color: #5A98EC"/>监控周期性采集数据间隔时间,单位秒
              </div>
            }}
            >
              <a-input-number v-model={form.monitor.intervals} min={10} max={60000} step={1} style="width:100%"/>
            </a-form-item>
            <a-form-item label="测试连接" v-slots={{
              help: () => <div style="font-size: 12px;color: #757D8F">
                <i class="a-icon-info" style="color: #5A98EC"/>新增监控前是否先探测检查监控可用性
              </div>
            }}
            >
              <a-switch v-model={form.detected}/>

            </a-form-item>

            <a-form-item label="描述备注" v-slots={{
              help: () => <div style="font-size: 12px;color: #757D8F">
                <i class="a-icon-info" style="color: #5A98EC"/>更多标识和描述此监控的备注信息
              </div>
            }}
            >
              <a-input v-model={form.monitor.description} type="textarea" rows={3} placeholder="请输入描述备注"/>
            </a-form-item>
          </a-form>
        </a-modal>
      </div>
    );
  },
});
