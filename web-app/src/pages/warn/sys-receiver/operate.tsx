import cloneDeep from 'lodash/cloneDeep';
import { defineComponent } from 'vue';
import type { FormInstance } from '@arco-design/web-vue';
import { addReceiver, getReceiver, modifyReceiver } from '@/service/api';
import { NOTICE_TYPE } from '@/utils/constants';
import type { sysInterface } from '@/service/api/interface';
import { Props, reset } from '@/pages/shared';

const defaultForm = {
  name: '', // 接收人
  type: [], // 通知方式
  phone: '', // 电话
  email: '', // 邮箱
  hookUrl: '', // Webhook URL
  wechatId: '', // 企业微信号
  accessToken: '', // 钉钉号
};

export default defineComponent({
  name: 'WarnRulesEdit',
  props: Props,
  emits: ['update:visible'],
  setup(props, { emit }) {

    const form = reactive<sysInterface>(cloneDeep(defaultForm));
    const formRef = ref<FormInstance>();
    const Message = useMessage();

    const handleCancel = () => {
      emit('update:visible', false);
    };
    watch(() => props.editId, (val) => {
      if (!val) {
        return;
      }
      getReceiver(val).then((res) => {
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
        addReceiver(form).then((res) => {
          Message?.success({
            content: t('message.createSuccess'),
          });
          reset(formRef, form, defaultForm);
          emit('update:visible', false);
        });
      } else {
        modifyReceiver({ ...form, ...{ id: props.editId } }).then((res) => {
          Message?.success({
            content: t('message.updateSuccess'),
          });
          reset(formRef, form, defaultForm);
          emit('update:visible', false);
        });
      }
    };

    onMounted(() => {

    });
    return () => (
      <div>
        <a-modal v-model:visible={props.visible} onOk={handleOk} onCancel={handleCancel} v-slots={{
          title: () => t('sysReceiver.form.title')
        }}
        >
          <a-form model={form} ref={formRef}>
          <a-form-item label={t('sysReceiver.form.name')}>
              <a-input v-model={form.name} placeholder={t('sysReceiver.form.name_placeholder')} />
          </a-form-item>
          <a-form-item label={t('sysReceiver.form.type')}>
              <a-select v-model={form.type} multiple placeholder={t('sysReceiver.form.type_placeholder')}>
                {
                  NOTICE_TYPE.map((item) => {
                    return (
                      <a-option value={item.key}>{item.value}</a-option>
                    );
                  })
                }
              </a-select>
          </a-form-item>
          <a-form-item label={t('sysReceiver.form.phone')}>
              <a-input v-model={form.phone} placeholder={t('sysReceiver.form.phone_placeholder')} />
          </a-form-item>
          <a-form-item label={t('sysReceiver.form.email')}>
              <a-input v-model={form.email} placeholder={t('sysReceiver.form.email_placeholder')} />
          </a-form-item>

          <a-form-item label={t('sysReceiver.form.wechatId')}>
              <a-input v-model={form.wechatId} placeholder={t('sysReceiver.form.wechatId_placeholder')} />
          </a-form-item>
          <a-form-item label={t('sysReceiver.form.accessToken')}>
              <a-input v-model={form.accessToken} placeholder={t('sysReceiver.form.accessToken_placeholder')} />
          </a-form-item>
          <a-form-item label={t('sysReceiver.form.hookUrl')}>
              <a-input v-model={form.hookUrl} placeholder={t('sysReceiver.form.hookUrl_placeholder')} />
          </a-form-item>
          </a-form>
        </a-modal>
      </div >
    );
  }
});
