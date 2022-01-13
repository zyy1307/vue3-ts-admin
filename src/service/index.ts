//service统一出口
import YYRequest from './request';
import { BASE_URL, TIME_OUT } from './request/config';
const yyRequest = new YYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      console.log(config);
      return config;
    }
  }
});
export default yyRequest;
