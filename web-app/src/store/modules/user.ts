import { defineStore } from 'pinia';
import { isEmpty } from 'lodash';
import { getUserInfo as customGetUserInfo, login as customLogin } from '@/service/api';
import type { loginParams, loginResponse, userResponse } from '@/service/api/interface';

const useUserStore = defineStore('user', () => {

  const userInfo = ref<userResponse>({});
  const refreshToken = ref<string>('');

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

    return customLogin<loginResponse>({ type, identifier: username?.trim(), credential: password }).then((resp: any) => {
      useToken.set(resp.data.token);
      refreshToken.value = resp.data.refreshToken;
      return resp;
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

