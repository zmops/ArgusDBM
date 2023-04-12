import cloneDeep from 'lodash/cloneDeep';
import { defineComponent } from 'vue';
import type { FormInstance } from '@arco-design/web-vue';
import { addDefine, getDefine, getHierarchy, modifyDefine } from '@/service/api';
import { WARN_LEVEL } from '@/utils/constants';
import type { ApiAlertDefine } from '@/service/api/interface';

const defaultFormData = {
  cascadeValues: [],
  app: '',
  metric: '',
  field: '',
  preset: true,
  expr: '',
  priority: 2,
  times: 3,
  enable: true,
  template: ''
};
const Props = {
  visible: {
    type: Boolean,
    default: false,
  },
  editId: {
    type: [String, Number],
    default: '',
  },
  type: {
    type: String,
    default: '',
  }
};

export default defineComponent({
  name: 'WarnRulesEdit',
  props: Props,
  emits: ['update:visible'],
  setup(props, { emit }) {

    const form = reactive<ApiAlertDefine>(cloneDeep(defaultFormData));
    const formRef = ref<FormInstance>();
    const hieoOptions = ref<any[]>([]);
    const otherMetrics = ref<any[]>([]);
    const Message = useMessage();

    const rule = {
      name: [{
        required: true,
        message: '请输入监控名称',
        trigger: 'blur'
      }]
    };
    const getHierarchyOptions = () => {
      getHierarchy().then((res: any) => {
        hieoOptions.value = res.data;
      });
    };

    const handleCancel = () => {
      emit('update:visible', false);
    };
    watch(() => props.editId, (val) => {
      if (!val) {
        return;
      }

      getDefine(val).then((res) => {
        const { code, data } = res;
        if (code !== 0 || !data) {
          return;
        }
        const { app, metric, field, ...other } = data;

        form.cascadeValues = [app, metric, field];

        Object.keys(form).forEach((key) => {
          if (key in other) {
            form[key] = res.data[key];
          }
        });
        form.enable = false;
      });
    });
    const handleCasChange = (value) => {
      if (value.length !== 3) {
        return;
      }

      const [app, metric, field] = value;
      hieoOptions.value.forEach((hierarchy) => {
        if (hierarchy.value === app) {
          hierarchy.children.forEach((metrics) => {
            if (metrics.value === metric) {
              otherMetrics.value = [];
              metrics.children.forEach((item) => {
                if (item.value !== field) {
                  otherMetrics.value.push(item.value);
                }
              });
            }
          });
        }
      });
    };
    const handleOk = () => {

      formRef.value?.validate((valid) => {
        if (valid) {
          return false;
        }
        // 数据格式化
        const data = Object.assign({}, form);
        const [app, metric, field] = data.cascadeValues || [];
        data.app = app;
        data.metric = metric;
        data.field = field;
        if (!props.editId) {
          addDefine(data).then((res) => {
            Message?.success({
              content: t('message.createSuccess'),
            });
            emit('update:visible', false);
          });
        } else {
          modifyDefine({ ...data, ...{ id: props.editId } }).then((res) => {
            Message?.success({
              content: t('message.updateSuccess'),
            });
            emit('update:visible', false);
          });
        }
      });
    };

    onMounted(() => {
      getHierarchyOptions();

    });
    return () => (
      <div>
        <a-modal v-model:visible={props.visible} width="600px" onOk={handleOk} onCancel={handleCancel} v-slots={{
          title: () => t('warnRules.form.title')
        }}
        >
          <a-form model={form} rule={rule} ref={formRef}>
            <a-form-item label={t('warnRules.form.field')} field="cascadeValues" required >
              <a-cascader v-model={form.cascadeValues} options={hieoOptions.value} path-mode onChange={handleCasChange} class="w-320px!" placeholder="Please select ..." />
            </a-form-item>
            <a-form-item label="">
              <a-collapse accordion>
                <a-collapse-item header={t('warnRules.form.field_collapse')}>

                  {
                    form.cascadeValues.length === 3 && <div>
                      <code> {'${' + form.cascadeValues[2] + '}'} : {t('warnRules.form.field_collapse_tip1')}</code>
                    </div>
                  }
                  {
                    otherMetrics.value.map((otherMetric) => {
                      return <div key={otherMetric}>
                        <code> {'${' + otherMetric + '}'} : {t('warnRules.form.field_collapse_tip2')}</code>
                      </div>;
                    })
                  }
                  {
                    form.cascadeValues.length !== 0 && <div>
                      <code>{t('warnRules.form.field_collapse_tip3')}</code>
                    </div>
                  }
                  <div><code> {t('warnRules.form.field_collapse_tip4')}</code></div>
                </a-collapse-item>
              </a-collapse>
            </a-form-item>
            <a-form-item label={t('warnRules.form.expr')} field="expr" required v-slots={{ help: () => t('warnRules.form.expr_tip') }}>
              <a-textarea v-model={form.expr} />
            </a-form-item>
            <a-form-item label={t('warnRules.form.priority')} field="priority" required v-slots={{ help: () => t('warnRules.form.priority_tip') }}>
              <a-select v-model={form.priority}>
                {
                  WARN_LEVEL.filter(i => i.key !== -1).map((item) => {
                    return <a-option value={item.key}
                      key={item.key}>{item.value}</a-option>;
                  })
                }
              </a-select>
            </a-form-item>
            <a-form-item label={t('warnRules.form.times')} field="times" required >
              <a-input-number v-model={form.times} min={1} max={10000} />
            </a-form-item>
            <a-form-item label="">
              <a-collapse accordion>
                <a-collapse-item header={t('warnRules.form.times_collapse')} >
                  <div><code> {t('warnRules.form.times_collapse_tip1')}</code></div>
                  <div><code>{t('warnRules.form.times_collapse_tip2')}</code></div>
                  {
                    form.cascadeValues.length === 3 && <div>
                      <code> {t('warnRules.form.times_collapse_tip3')}</code>
                    </div>
                  }
                  {
                    form.cascadeValues.length === 3 && <div>
                      <code> {'${' + form.cascadeValues[2] + '}'} : {t('warnRules.form.times_collapse_tip4')}</code>
                    </div>
                  }
                  {
                    otherMetrics.value.map((otherMetric) => {
                      return <div key={otherMetric}>
                        <code> {'${' + otherMetric + '}'} : {t('warnRules.form.times_collapse_tip5')}</code>
                      </div>;
                    })
                  }
                  <div><code> {t('warnRules.form.times_collapse_tip6')}</code></div>
                </a-collapse-item>
              </a-collapse>
            </a-form-item>
            <a-form-item label={t('warnRules.form.template')} field="template" required v-slots={{ help: () => t('warnRules.form.template_tip') }}>
              <a-textarea v-model={form.template} />
            </a-form-item>
            <a-form-item label={t('warnRules.form.preset')} field="preset" required v-slots={{ help: () => t('warnRules.form.preset_tip') }}>
              <a-switch v-model={form.preset} />
            </a-form-item>
            <a-form-item label={t('warnRules.form.enable')} field="enable" required v-slots={{ help: () => t('warnRules.form.enable_tip') }}>
              <a-switch v-model={form.enable} />
            </a-form-item>
          </a-form>
        </a-modal>
      </div >
    );
  }
});
