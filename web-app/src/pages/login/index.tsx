import { defineComponent } from 'vue';
import type { FormInstance } from '@arco-design/web-vue';
import Logo from '@/assets/logo.svg';
import loginBg from '@/assets/images/loginbg.png';
import { useUserStore } from '@/store';

export default defineComponent({
  name: 'Login',
  setup() {
    const formRef = ref<FormInstance>();

    const router = useRouter();
    const route = useRoute();
    const userStore = useUserStore();

    const Message = useMessage();

    const { redirect, ...otherQuery } = route.query;

    const userInfo = reactive({
      type: '1',
      username: 'argus',
      password: 'argus'
    });

    const rules = {
      username: [
        {
          required: true,
          message: '请输入用户名',
        },
      ],
      password: [
        {
          required: true,
          message: '请输入密码',
        },
      ],
    };

    const handleSubmit = () => {
      formRef.value?.validate((valid) => {
        if (valid) {
          return false;
        }
        userStore.login(userInfo).then((res) => {
          if (res.code !== 0) {
            Message.error(res.statusText);
          }
          router.push({
            path: redirect as string || '/',
            query: otherQuery
          });
        });
      });
    };

    return () => (
      <div class="bg-[#F0F3F7] bg-cover login h-full w-full dark:bg-dark" style={{ backgroundImage: 'url(' + loginBg + ')' }}>
        <section class="m-auto max-w-520px p-10 pt-220px">

          <div class="flex items-center justify-center text-8">
            <img src={Logo} alt="" srcset="" class="mr-2" />
            <span>{t('login.title')}</span>
          </div>
          <p class="text-center text-4 w-full mt-4 color-subtitle">{t('login.subtitle')}</p>
          <p class="w-full mt-9 text-left color-primary">{t('login.formtip')}</p>
          <a-form model={userInfo} ref={formRef} rules={rules} onSubmit={handleSubmit} class="mt-6">
            <a-form-item size="large" field="username" hide-label={true} >
              <a-input
                v-slots={
                  {
                    prefix: () => <icon-user class="color-primary" />
                  }
                }
                v-model={userInfo.username}
                placeholder={t('login.username')}
              />
            </a-form-item>
            <a-form-item field="password" hide-label={true}>
              <a-input v-slots={
                {
                  prefix: () => <icon-lock class="color-primary" />
                }
              } v-model={userInfo.password} placeholder={t('login.password')} />
            </a-form-item>
            {/* <a-form-item field="type" hide-label={true} >
              <p class="w-full flex justify-between">
                <a-checkbox v-model={autoLogin.value}>{t('login.autoLogin')}</a-checkbox>
                <span class="color-primary">{t('login.forgetPassword')}</span>
              </p>
            </a-form-item> */}
            <a-form-item hide-label={true}>
              <a-button html-type="submit" class="w-full" type="primary">
                {t('login.logIn')}
              </a-button>
            </a-form-item>
          </a-form>
        </section>
      </div>
    );
  },
});
