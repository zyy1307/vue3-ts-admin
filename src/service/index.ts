//service统一出口
import cache from '@/utils/cache';
import YYRequest from './request';
import { BASE_URL, TIME_OUT } from './request/config';
const yyRequest = new YYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      const token = cache.getCache('token') ?? '';
      if (token) {
        //header不可能为空！
        config.headers!.Authorization = `Bearer ${token}`;
      }
      return config;
    }
  }
});
export default yyRequest;
