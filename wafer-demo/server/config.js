
// [rootPathname, useQcloudLogin, cos, serverHost, tunnelServerUrl, tunnelSignatureKey, qcloudAppId, qcloudSecretId, qcloudSecretKey, wxMessageToken].
const CONF = {
    port: '5757',
    rootPathname: '',

    // 微信小程序 App ID
    appId: 'wx88152eef614c3441',

    // 微信小程序 App Secret
    appSecret: '37971006ed3baa814e0de260131788cd',
    wxMessageToken: 'tech997.com',
    // 是否使用腾讯云代理登录小程序
    useQcloudLogin: true,
    // 
    serverHost: 'localhost',
    tunnelServerUrl: '',
    tunnelSignatureKey: '',
    // 腾讯云存储的相关信息
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
        port: 3306,
        user: 'root',
        db: 'cAuth',
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

    // 微信登录态有效期
    wxLoginExpires: 7200
}
console.log(process.env.NODE_ENV);

// module.exports = process.env.NODE_ENV === 'local' ? Object.assign({}, CONF, require('./config.local')) : CONF;
module.exports = process.env.NODE_ENV === 'local' ? Object.assign({}, CONF) : CONF;
