import axios from 'axios'; //拿到的axios是一个实例（对象），已经有方法了
//引入接口
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElLoading } from 'element-plus';
//定义拦截接口
interface YYInterceptor<T = AxiosResponse> {
  //请求拦截
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestCatch?: (err: any) => any;
  //响应拦截
  responseInterceptor?: (res: T) => T; //不传类型参数默认AxiosResponse
  responseCatch?: (err: any) => any;
}
//扩展原config-现在可以传拦截器函数了
interface YYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: YYInterceptor<T>;
  showLoading?: boolean; //要不要转圈
}
class YYRequest {
  instance: AxiosInstance;
  interceptors?: YYInterceptor;
  loading?: any;
  showLoading: boolean;
  //类的特性：封装，在这里封装函数
  constructor(config: YYRequestConfig<any>) {
    //config里传入特别的配置
    //new一个YYRequest实例可以创建一个新的服务
    this.instance = axios.create(config);
    //你不指定true，默认不显示loading
    this.showLoading = config.showLoading ?? false;
    this.interceptors = config.interceptors;
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseCatch
    );
    //添加所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据',
            fullscreen: true,
            background: 'rgba(0,0,0,0.5)'
          });
        }
        return config;
      },
      (err) => err
    );
    this.instance.interceptors.response.use(
      (res) => {
        //有loading就移除
        this.loading?.close();
        const data = res.data;
        return data;
      },
      (err) => {
        this.loading?.close();
        return err;
      }
    );
  }
  request<T = any>(config: YYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        //如果有拦截器，就执行以下，反正返回的还是config所以ok
        config = config.interceptors.requestInterceptor(config);
      }
      if (config.showLoading) {
        this.showLoading = config.showLoading;
      }
      this.instance
        //这里的T是resdata的类型,由外界传来，不传是axiosResponse（因为你returndata改了，不是原AxiosRes，所以你现在要自己制定dataType，写个接口）
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            //如果有拦截器，就执行以下，反正返回的还是config所以ok
            res = config.interceptors.responseInterceptor(res);
          }
          this.showLoading = false; //设置回默认值
          resolve(res);
        })
        .catch((err) => {
          reject(err);
          this.showLoading = false;
        });
    });
  }
  get<T = any>(config: YYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' });
  }
  post<T = any>(config: YYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' });
  }
  delete<T = any>(config: YYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' });
  }
  patch<T = any>(config: YYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' });
  }
}
export default YYRequest;
