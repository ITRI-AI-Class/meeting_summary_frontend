import axios from 'axios';

// 定義自訂的請求配置類型
interface CustomAxiosRequestConfig extends Axios.AxiosXHRConfig<string> {
  _retry?: boolean; // 用於標記重試的屬性
  signal?: AbortSignal; // 用於取消請求的信號
}

var env = import.meta.env.MODE;

const instance = axios.create({
  baseURL: env === 'localtest' ? 'http://localhost:6080/api/' : env === 'dev' ? 'https://192.168.10.75:6080/api/' : '/api/',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 管理全局的 AbortController
let abortController: AbortController | null = null;

// 請求攔截器
instance.interceptors.request.use(
  (config: CustomAxiosRequestConfig) => {
    // 設置取消請求
    if (!abortController) {
      abortController = new AbortController();
    }
    config.signal = abortController.signal;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 響應攔截器
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 可處理 401 錯誤
          break;
        case 500:
          // 可處理 500 錯誤
          break;
      }
    }

    return Promise.reject(error);
  }
);

// 重置取消控制器
export const resetAbortController = () => {
  if (abortController) {
    abortController.abort();
    abortController = new AbortController();
  }
};

export default instance;
