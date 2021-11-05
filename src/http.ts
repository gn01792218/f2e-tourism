import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import jsSHA from 'jssha';

// axios實例
const service = axios.create({
  baseURL:'https://ptx.transportdata.tw/MOTC/',
  headers: { 'Content-Type': 'application/json' },
  timeout: 20000 // 超时时间
});

//
const header = getAuthorizationHeader() as AxiosRequestConfig
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
//加密herder
function getAuthorizationHeader() {
  //  填入自己 ID、KEY 開始
      let AppID = '0369de6f30be4e2ea30386c8c3c3ef6b';
      let AppKey = 'cf-8qbLmfnA7Hv7KBZAcoVlpVSM';
  //  填入自己 ID、KEY 結束
      let GMTString = new Date().toUTCString();
      let ShaObj = new jsSHA('SHA-1', 'TEXT');
      ShaObj.setHMACKey(AppKey, 'TEXT');
      ShaObj.update('x-date: ' + GMTString);
      let HMAC = ShaObj.getHMAC('B64');
      let Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
      return {headers:{ 'Authorization': Authorization, 'X-Date': GMTString }}; 
  }
export default (method:string ,url:string ,data = null , config?:any)=>{
    method = method.toLowerCase()
    switch(method){
        case 'get':
            return service.get(url,header)
    }

}
// export default service;