import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";

import NProgress from "nprogress";
import "nprogress/nprogress.css";

// 全局变量
// console.log('环境变量env==>', import.meta.env)
const env = import.meta.env;

// 设置请求头和请求路径
axios.defaults.baseURL = "http://" + env.VITE_APP_REQUEST_URL;
axios.defaults.timeout = 1000 * 30;
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
// 添加请求拦截器
axios.interceptors.request.use(
  (request: AxiosRequestConfig) => {
    const token = sessionStorage.getItem("Authorization");
    // @ts-ignore
    token && (request.headers.Authorization = token);
    return request;
  },
  (error: any) => {
    ElMessage.error("请求出错!");
    return Promise.reject(error);
  }
);
// 添加响应拦截器
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    // 拦截响应，统一处理某些响应
    if (!(response && response.data)) {
      return;
    }
    // 判断返回的状态
    switch (response.status) {
      case 200:
        break;
      default:
        ElMessage.error("网络请求错误！");
    }
    return response;
  },
  (error: any) => {
    ElMessage.error("请求失败, 请稍后再试！");
    // 统一处理请求error
    switch (error.response.status) {
      case 401:
        // 返回 401 清除token信息并跳转到登录页面
        ElMessage.error("登录信息过期 请登录！");
        sessionStorage.removeItem("Authorization");
        // 路由跳转到登录
        // this.$route.push('/login');
        break;
      default:
        ElMessage.error(`请求失败,errCode=${error.response.status}`);
    }
    return Promise.reject(error);
  }
);

// 定义接口，限制请求&响应数据类型
interface ResType<T> {
  code: number | string;
  msg: string;
  data?: T;
}
interface Http {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<ResType<T>>;
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<ResType<T>>;
  post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ResType<T>>;
  put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ResType<T>>;
}

const http: Http = {
  // 可以将params写入config
  get<T>(url: string, params: T) {
    return new Promise((resolve, reject) => {
      NProgress.start();
      axios
        .get(url, { params })
        .then((res) => {
          NProgress.done();
          resolve(res.data);
        })
        .catch((err) => {
          NProgress.done();
          reject(err);
        });
    });
  },
  delete<T>(url: string, params: any) {
    return new Promise((resolve, reject) => {
      NProgress.start();
      axios
        .delete(url, { params })
        .then((res) => {
          NProgress.done();
          resolve(res.data);
        })
        .catch((err) => {
          NProgress.done();
          reject(err);
        });
    });
  },
  post<T>(url: string, data: any, config?: AxiosRequestConfig) {
    return new Promise((resolve, reject) => {
      NProgress.start();
      axios
        .post(url, data, config)
        .then((res) => {
          NProgress.done();
          resolve(res.data);
        })
        .catch((err) => {
          NProgress.done();
          reject(err);
        });
    });
  },
  put<T>(url: string, data: any, config?: AxiosRequestConfig) {
    return new Promise((resolve, reject) => {
      NProgress.start();
      axios
        .put(url, data, config)
        .then((res) => {
          NProgress.done();
          resolve(res.data);
        })
        .catch((err) => {
          NProgress.done();
          reject(err);
        });
    });
  },
};

export default http;
