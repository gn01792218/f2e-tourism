import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';


// axios實例
const service = axios.create({
  baseURL:'https://ptx.transportdata.tw/MOTC/',
  headers: { 'Content-Type': 'application/json' },
  timeout: 20000 // 超时时间
});
// 请求攔截
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  (err: any) => {
    Promise.reject(err);
  }
);
// 回應攔截
service.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (err: any) => {
    let errMsg = '';
    if (err && err.response.status) {
      switch (err.response.status) {
        case 403:
          errMsg = '拒絕訪問';
          break;
        case 408:
          errMsg = '請求超時';
          break;
        case 500:
          errMsg = 'server內部錯誤';
          break;
        case 501:
          errMsg = 'server未實現';
          break;
        case 503:
          errMsg = '服務不可用';
          break;
        default:
          errMsg = err.response.data.msg;
          break;
      }
    } else {
      errMsg = err;
    }
    console.log(errMsg)
    // Message.error(errMsg);
    return Promise.reject(errMsg);
  }
);
export default (method:string ,url:string ,data = null , config?:any)=>{
    method = method.toLowerCase()
    switch(method){
        case 'get':
            return service.get(url)
    }

}
// export default service;