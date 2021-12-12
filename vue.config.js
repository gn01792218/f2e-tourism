const webPack = require('webpack')
module.exports = {
  publicPath: process.env.VUE_APP_BASE_URL,
  devServer: {
    open: true,//啟動預設瀏覽器開啟
    host: "localhost",
    port: 8080,
    https: false,
    // proxy: {//配置跨域
    //     '/api': {
    //         target: 'https://ptx.transportdata.tw/MOTC/',//介面地址
    //         ws: true,
    //         changOrigin: true,//允許跨域
    //         secure: false,//是否支援https
    //         // pathRewrite: {
    //         //     '^/api': '' // /api表示http://xxx.com/api/
    //         // }
    //     }
    // }
  },
}
