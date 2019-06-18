import axios from 'axios'
import {Message, MessageBox} from 'element-ui'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  headers: {'Content-Type': 'application/json;charset=utf-8'},
  timeout: 5000 // 请求超时时间
});
// request拦截器
service.interceptors.request.use(config => {
  let token = localStorage.getItem('token');
  if (token) {
    config.data['token'] = token;
  }
  return config;
}, err => {
  return Promise.reject(err);
});


// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.resultCode === 0) {
      Message({
        message: res.resultMsg,
        type: 'error',
        duration: 5 * 1000
      });

      if (res.resultCode === 2) {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {

        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    let errMsg = "";
    if (error.message === "Network Error") {
      errMsg = "网络异常";
    } else {
      errMsg = error.message
    }
    Message({
      message: errMsg,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error)
  }
);

export default service;
