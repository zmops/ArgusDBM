import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { Message, Modal } from '@arco-design/web-vue';
import { useToken } from './../../composables/token';
import { REFRESH_TOKEN_CODE, REQUEST_ERROR_MSG } from './constants';

/** 后端接口返回的数据结构配置 */
export interface BackendResultConfig {
  /** 表示后端请求状态码的属性字段 */
  codeKey: string;
  /** 表示后端请求数据的属性字段 */
  dataKey: string;
  /** 表示后端消息的属性字段 */
  msgKey: string;
  /** 后端业务上定义的成功请求的状态 */
  successCode: number | string;
}

export default class CustomAxiosInstance {
  instance: AxiosInstance;

  backendConfig: BackendResultConfig;

  /**
   *
   * @param axiosConfig - axios配置
   * @param backendConfig - 后端返回的数据配置
   */
  constructor(
    axiosConfig: AxiosRequestConfig,
    backendConfig: BackendResultConfig = {
      codeKey: 'code',
      dataKey: 'data',
      msgKey: 'msg',
      successCode: 0
    }
  ) {
    this.backendConfig = backendConfig;
    this.instance = axios.create(axiosConfig);
    this.setInterceptor();
  }

  /** 设置请求拦截器 */
  setInterceptor() {
    this.instance.interceptors.request.use(
      async (config) => {
        const tk: string = useToken.get();
        if (tk) { config.headers['Authorization'] = 'Bearer ' + tk; }
        return config;
      },
    );
    this.instance.interceptors.response.use(
      async (response): Promise<any> => {
        const { status } = response;
        if (status === 200 || status < 300 || status === 304) {
          const backend = response.data;
          const { codeKey, dataKey, successCode, msgKey } = this.backendConfig;

          // 请求成功
          if (backend[codeKey] === successCode) {
            return {
              status,
              code: backend[codeKey],
              statusText: backend[msgKey] as string,
              data: backend[dataKey] as any
            };
          }

          return {
            status,
            code: backend[codeKey],
            statusText: backend[msgKey] as string,
            data: null
          };

        }
        // const error = handleResponseError(response);
        // return handleServiceResult(error, null);
      },
      async (error: AxiosError) => {
        const { status } = error.response || {};

        // 暂时没有刷新token
        // const handleRefreshToken = async (config: AxiosRequestConfig) => {
        //   const { data } = await this.instance.post('/api/account/auth/form', { refreshToken: userState.refreshToken });
        //   if (data.code === 0) {
        //     useToken().set(data.data.token);
        //     if (config.headers) {
        //       config.headers['Authorization'] = 'Bearer ' + data.data.token;
        //     }
        //     return config;
        //   } else {
        //     Modal.confirm({
        //       title: '登录失效',
        //       content: '登录失效，请重新登录',
        //       onOk: () => {
        //         window.location.href = '/login';
        //       },
        //     });
        //   }
        // };
        // if (REFRESH_TOKEN_CODE.includes(status || '') && error.config && userState.refreshToken) {

        //   const config = await handleRefreshToken(error.config);
        //   if (config) {
        //     return this.instance.request(config);
        //   }
        // }

        if (status === REFRESH_TOKEN_CODE) {
          useToken.remove();
          Modal.confirm({
            title: '登录失效',
            content: REQUEST_ERROR_MSG[status],
            onOk: () => {
              window.location.reload();
            },
          });
        } else {

          Message.error({
            content: error?.message || 'Request Error',
            duration: 5 * 1000,
          });
          return Promise.reject(error);
        }
      }
    );
  }
}
