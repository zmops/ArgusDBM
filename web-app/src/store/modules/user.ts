import { defineStore } from 'pinia';
import isEmpty from 'lodash/isEmpty';
import { getUserInfo as customGetUserInfo, login as customLogin } from '@/service/api';
import type { loginParams, loginResponse, userResponse } from '@/service/api/interface';

const useUserStore = defineStore('user', () => {

  const userInfo = ref<userResponse>({});
  const refreshToken = ref<string>('');

  const Message = useMessage();

  async function getUserInfo(): Promise<userResponse> {
    if (!isEmpty(userInfo.value)) {
      return userInfo.value;
    }
    const { data } = await customGetUserInfo<userResponse>();
    userInfo.value = data || {};
    return userInfo.value;
  }

  function login(userInfo: loginParams) {

    const { type, username, password } = userInfo;

    return customLogin<loginResponse>({ type, identifier: username?.trim(), credential: password }).then((res) => {

      if (res.code === 0 && res.data) {
        useToken.set(res.data.token);
        refreshToken.value = res.data.refreshToken;
        return res;
      } else {
        Message.error(res.statusText || '登录失败');
      }

    });
  }

  async function logout() {
    useToken.remove();
    userInfo.value = {};
  }

  return {
    userInfo,
    refreshToken,
    getUserInfo,
    logout,
    login,
  };
});
export default useUserStore;

