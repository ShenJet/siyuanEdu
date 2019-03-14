/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
// var host = 'http://192.168.2.102:8899';
// var host = 'http://192.168.1.146:8899';
// var host = 'http://111.231.78.250:8898';
// var host = 'http://www.tech997.cn:8899';
var host = 'https://www.siyuanwlkj.com';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,

        // 上传图片接口
        uploadUrl: `${host}/weapp/upload`,

        // index - 获取热门商品列表（轮播图）
        newsUrl: `${host}/weapp/newslist`,

        // index - 查询身份信息
        rolecheckUrl: `${host}/weapp/rolecheck`,

        // 获取老师列表
        getteacherlistUrl: `${host}/weapp/teacherlist`,
                
        // 获取老师详情
        teacherdetailUrl: `${host}/weapp/teacherdetail`,
                
        // 获取已支付老师详情
        teacherfulldetailUrl: `${host}/weapp/teacherfulldetail`,

        // 获取学生列表
        getstudentlistUrl: `${host}/weapp/studentlist`,
                
        // 获取学生详情
        studentdetailUrl: `${host}/weapp/studentdetail`,
                
        // 获取已支付学生详情
        studentfulldetailUrl: `${host}/weapp/studentfulldetail`,

        // 通过后端调统一下单接口
        prepayUrl: `${host}/weapp/prepay`,

        // 获取订单列表
        getOrderList: `${host}/weapp/orderlist`,

        // 删除订单
        deleteorderUrl: `${host}/weapp/deleteorder`,

        // 获取已发布商品
        myreleaseUrl: `${host}/weapp/myrelease` ,

        // 删除已发布商品
        deletemyreleaseUrl: `${host}/weapp/myreleasedelete` ,

        // 编辑已发布商品
        editmyreleaseUrl: `${host}/weapp/myreleaseedit` ,

        // 刷新已发布商品
        refreshmyreleaseUrl: `${host}/weapp/myreleaserefresh` ,

        // 暂时下架已发布商品
        obtainmyreleaseUrl: `${host}/weapp/myreleaseobtain` ,

        // 暂时下架已发布商品
        releasemyreleaseUrl: `${host}/weapp/myreleaserelease` ,

        // 老师申请
        teacherapplyUrl: `${host}/weapp/teacherapply`,

        // 学生提交资料
        studentapplyUrl: `${host}/weapp/studentapply`,

        // decryptwxinfo
        decryptwxinfo: `${host}/weapp/decryptwxinfo`,

        // userphoneupload
        userphoneupload: `${host}/weapp/userphoneupload`,

        // confirmphone
        confirmphone: `${host}/weapp/confirmphone`,
    },
    mapkey:'NNWBZ-OSLKD-ABD4N-POSXK-QFOAZ-GZBWR'
};

export default config;