import cloneDeep from 'lodash/cloneDeep';
import { defineComponent } from 'vue';
import type { FormInstance } from '@arco-design/web-vue';
import { addRule, getReceivers, getRule, getTags, modifyRule } from '@/service/api';
import { NOTICE_TYPE, WARN_LEVEL } from '@/utils/constants';
import type { sysInterface } from '@/service/api/interface';
import { Props, reset } from '@/pages/shared';

const tagsQuery = {
  search: '',
  type: 0,
  pageIndex: 0,
  pageSize: 1000
};
const defaultForm = {
  name: '',
  receiverId: '',
  receiverName: '',
  enable: true,
  filterAll: true,
  priorities: [],
  tags: [],
  type: []
};

export default defineComponent({
  name: 'WarnRulesEdit',
  props: Props,
  emits: ['update:visible'],
  setup(props, { emit }) {

    const form = reactive(cloneDeep(defaultForm));
    const formRef = ref<FormInstance>();
    const Message = useMessage();
    const receiverOptions = ref<sysInterface[]>([]);
    const tagsOptions = ref<any[]>([]);

    const handleCancel = () => {
      emit('update:visible', false);
    };
    watch(() => props.editId, (val) => {
      if (!val) {
        return;
      }
      getRule(val).then((res) => {
        const { code, data } = res;
        if (code !== 0 || !data) {
          return;
        }
        Object.keys(form).forEach((key) => {
          if (key in data) {
            form[key] = res.data[key];
          }
        });
      });
    });

    const handleOk = () => {
      if (!props.editId) {
        addRule(form).then((res) => {
          Message?.success({
            content: t('message.createSuccess'),
          });
          reset(formRef, form, defaultForm);
          emit('update:visible', false);
        });
      } else {
        modifyRule({ ...form, ...{ id: props.editId } }).then((res) => {
          Message?.success({
            content: t('message.updateSuccess'),
          });
          reset(formRef, form, defaultForm);
          emit('update:visible', false);
        });
      }
    };

    const getReceiversOptions = () => {
      getReceivers({
        pageSize: 1000
      }).then((res) => {
        if (res.code === 0 && res.data) {
          receiverOptions.value = res.data.content;
        }
      });
    };
    const getTagsOptions = ()=> {
      getTags(tagsQuery).then((res) => {
        if (res.code === 0 && res.data) {
          tagsOptions.value = res.data.content;
        }
      });
    };
    onMounted(() => {
      getReceiversOptions();
      getTagsOptions();
    });
    return () => (
      <div>
        <a-modal v-model:visible={props.visible} onOk={handleOk} onCancel={handleCancel} v-slots={{
          title: () => t('notificationRules.form.title')
        }}
        >
          <a-form model={form} ref={formRef}>
            <a-form-item label={t('notificationRules.form.name')}>
              <a-input v-model={form.name} placeholder={t('notificationRules.form.name_placeholder')} />
            </a-form-item>
            <a-form-item label={t('notificationRules.form.receiverName')}>
              <a-select v-model={form.receiverId} placeholder={t('notificationRules.form.receiverName_placeholder')} style="width:100%">
                {
                  receiverOptions.value.map((item) => {
                    return (
                      <a-option value={item.id}>{item.name}</a-option>
                    );
                  })
                }
              </a-select>
            </a-form-item>
            <a-form-item label={t('notificationRules.form.filterAll')}>
              <a-switch v-model={form.filterAll}></a-switch>
            </a-form-item>
            <a-form-item label={t('notificationRules.form.tags')}>
              <a-select v-model={form.tags} disabled={!props.editId} multiple placeholder={t('notificationRules.form.tags_tip')}>
                {
                  tagsOptions.value.map((item) => {
                    return (
                      <a-option value={item.id}>{item.name}</a-option>
                    );
                  })
                }
              </a-select>
            </a-form-item>
            <a-form-item label={t('notificationRules.form.priorities')}>
              <a-select v-model={form.priorities} disabled={!props.editId} multiple placeholder={t('notificationRules.form.priorities_placeholder')}>
                {
                  WARN_LEVEL.map((item) => {
                    return (
                      <a-option value={item.key}>{item.value}</a-option>
                    );
                  })
                }

              </a-select>
            </a-form-item>
            <a-form-item label={t('notificationRules.form.type')}>
              <a-select v-model={form.type} multiple placeholder={t('notificationRules.form.type_placeholder')}>
                {
                  NOTICE_TYPE.map((item) => {
                    return (
                      <a-option value={item.key}>{item.value}</a-option>
                    );
                  })
                }
              </a-select>
            </a-form-item>
          </a-form>
        </a-modal>
      </div >
    );
  }
});
