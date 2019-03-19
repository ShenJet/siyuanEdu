
// [rootPathname, useQcloudLogin, cos, serverHost, tunnelServerUrl, tunnelSignatureKey, qcloudAppId, qcloudSecretId, qcloudSecretKey, wxMessageToken].
const CONF = {
    serverHost: '212.64.64.99',
    port: '8898',
    rootPathname: '',
    // 思元微信小程序 App ID
    appId: 'wxcad3341551190ad3',
    // 思元微信小程序 App Secret
    appSecret: 'b366275aaec4372d61fdd7c20e0a8ed2',
    // // 御湖湾微信小程序 App ID
    // appId: 'wx88152eef614c3441',
    // // 御湖湾微信小程序 App Secret
    // appSecret: 'b366275aaec4372d61fdd7c20e0a8ed2',
    
    // 加密token
    wxMessageToken: 'tech997.com',
    // 是否使用腾讯云代理登录小程序
    useQcloudLogin: false,
    // 
    tunnelServerUrl: '',
    tunnelSignatureKey: '',
    // 腾讯云存储的相关信息 见：https://console.qcloud.com/cos5/bucket/setting?type=filelist&bucketName=piwubang-1257779595&path=%252Ftestupload%252F&region=ap-shanghai
    qcloudAppId: '1258610094', 
    qcloudSecretId: 'AKIDIPIwYxobmUDpHahujMOHxDF3cxITmDgu', 
    qcloudSecretKey: '82oPwFL6cuynOrNiiT3OXTF1bptlOmut', 
    /**
     * MySQL 配置，用来存储 session 和用户信息
     * 若使用了腾讯云微信小程序解决方案
     * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
     */
    mysql: {
        host: '212.64.64.99',
        db: 'siyuan',
        port: 3306,
        user: 'root',
        pass: 'siyuan@123',
        char: 'utf8mb4'
    },
    cos: {
        /**
         * 区域
         * @查看 https://cloud.tencent.com/document/product/436/6224
         */
        region: 'ap-shanghai',
        // Bucket 名称
        fileBucket: 'siyuan',
        // 文件夹
        uploadFolder: 'upload'
    },
    // 支付配置项
    // 思元家教支付：
    payconf:{
         appid :     'wxcad3341551190ad3',
         appsecret : 'b366275aaec4372d61fdd7c20e0a8ed2',
         mchid :     '1525651531',  //商户号
         mchkey :    'TVU1MO18PS9YQLW58P2SENSEW6O46JIY', // 商户API密码
         wxurl :     'https://www.siyuanwlkj.com/weapp/getnotification', // 下单后的通知地址
    },
    // 腾讯短信服务
    wxsmsconf:{
        appid: 1400194579,
        appkey: '3f4fbbf407ba482fa1dd6c810d9c5a2c',
        appname: '92家教',
        templateId: 295433,
        // phoneNumbers:['13814878101','18112528156'], // 数据库获取
        smsSign: '92家教'
    },

    // 微信登录态有效期
    wxLoginExpires: 7200
    // wxLoginExpires: 15

}
// console.log(process.env.NODE_ENV);
// module.exports = process.env.NODE_ENV === 'local' ? Object.assign({}, CONF, require('./config.local')) : CONF;
// module.exports = process.env.NODE_ENV === 'local' ? Object.assign({}, CONF) : CONF;
module.exports = CONF ;

