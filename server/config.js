
// [rootPathname, useQcloudLogin, cos, serverHost, tunnelServerUrl, tunnelSignatureKey, qcloudAppId, qcloudSecretId, qcloudSecretKey, wxMessageToken].
const CONF = {
    serverHost: 'localhost',
    port: '8898',
    rootPathname: '',
    // 微信小程序 App ID
    appId: 'wxcad3341551190ad3',
    // 微信小程序 App Secret
    appSecret: 'b366275aaec4372d61fdd7c20e0a8ed2',
    // 加密token
    wxMessageToken: 'tech997.com',
    // 是否使用腾讯云代理登录小程序
    useQcloudLogin: false,
    // 
    tunnelServerUrl: '',
    tunnelSignatureKey: '',
    // 腾讯云存储的相关信息 见：https://console.qcloud.com/cos5/bucket/setting?type=filelist&bucketName=piwubang-1257779595&path=%252Ftestupload%252F&region=ap-shanghai
    qcloudAppId: '1257779595', 
    qcloudSecretId: 'AKIDc5DzdAbt0xkJVYtTr6QeruoYfXHuCgpo', 
    qcloudSecretKey: 'JWgaO3awGnFf2IOL8lzsPuNtJYgEpuof', 
    /**
     * MySQL 配置，用来存储 session 和用户信息
     * 若使用了腾讯云微信小程序解决方案
     * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
     */
    mysql: {
        host: 'localhost',
        db: 'siyuan',
        port: 3306,
        user: 'root',
        pass: 'root',
        char: 'utf8mb4'
    },
    cos: {
        /**
         * 区域
         * @查看 https://cloud.tencent.com/document/product/436/6224
         */
        region: 'ap-shanghai',
        // Bucket 名称
        fileBucket: 'piwubang',
        // 文件夹
        uploadFolder: 'testupload'
    },
    // 支付配置项
    payconf:{
         appid :     'wxcad3341551190ad3',
         appsecret : 'b366275aaec4372d61fdd7c20e0a8ed2',
         mchid :     '1515387251',  //商户号
         mchkey :    'TVU1MO18PS9YQLW58P2SENSEW6O46JIY', // 商户API密码
         wxurl :     'http://www.tech997.cn:8898/weapp/getnotification', // 下单后的通知地址
    },

    // 微信登录态有效期
    wxLoginExpires: 7200
    // wxLoginExpires: 15

}
// console.log(process.env.NODE_ENV);
// module.exports = process.env.NODE_ENV === 'local' ? Object.assign({}, CONF, require('./config.local')) : CONF;
// module.exports = process.env.NODE_ENV === 'local' ? Object.assign({}, CONF) : CONF;
module.exports = CONF ;

