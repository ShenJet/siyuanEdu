/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/weapp'   // 定义所有路由的前缀都已 /weapp 开头
})
// const xmlParser = require('koa-xml-body');

const controllers = require('../controllers')
const unifiedorder = require('../wxpay/pay.js')
const custompay = require('../wxpay/custompay.js')

const getnotification = require('../wxpay/getnotification.js')
const getnotification_custompay = require('../wxpay/getnotification_custompay.js')


// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

// --- 登录与授权 Demo --- //
// 登录接口 /weapp/login
router.get('/login', authorizationMiddleware, controllers.login)

// 用户信息接口（可以用来验证登录态） /weapp/user
router.get('/user', validationMiddleware, controllers.user)

// --- 图片上传 Demo --- //
// 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中 /weapp/upload
router.post('/upload', validationMiddleware, controllers.upload)

// --- 信道服务接口 Demo --- //
// GET  用来响应请求信道地址的 /weapp/tunnel
router.get('/tunnel', controllers.tunnel.get)
// POST 用来处理信道传递过来的消息
router.post('/tunnel', controllers.tunnel.post)

// --- 客服消息接口 Demo --- //
// GET  用来响应小程序后台配置时发送的验证请求 /weapp/message
router.get('/message', controllers.message.get)
// POST 用来处理微信转发过来的客服消息
router.post('/message', controllers.message.post)

// GET !!! 小程序查询首页轮播图
router.get('/swiperlist', controllers.getswiperlist)

// POST !!! 小程序老师申请
router.post('/teacherapply', validationMiddleware, controllers.applysforteacher)

// POST !!! 小程序学生提交资料
router.post('/studentapply', validationMiddleware, controllers.applysforstudent)

// GET !!! 小程序查询老师列表
router.get('/teacherlist', controllers.getteacherlist)

// GET !!! 小程序查询老师详情
router.get('/teacherdetail', validationMiddleware, controllers.getteacherdetail)

// GET !!! 小程序查询已支付老师详情
router.get('/teacherfulldetail', validationMiddleware, controllers.getteacherfulldetail)

// GET !!! 小程序查询学员列表
router.get('/studentlist', controllers.getstudentlist)

// GET !!! 小程序查询学员详情
router.get('/studentdetail', validationMiddleware, controllers.getstudentdetail)

// GET !!! 小程序查询已支付学员详情
router.get('/studentfulldetail', validationMiddleware, controllers.getstudentfulldetail)

// GET !!! 小程序统一下单
// router.get('/prepay', validationMiddleware, unifiedorder)
router.post('/prepay', validationMiddleware, unifiedorder)

// GET !!! 小程序用户自定义输入支付
router.post('/custompay', validationMiddleware, custompay)

// POST !!! 小程序下单支付后，微信服务器回调通知
router.post( '/getnotification',  getnotification.post )

// POST !!! 小程序用户定义金额主动支付，微信服务器回调通知
router.post( '/getnotification_custompay',  getnotification_custompay.post )

// GET !!! 小程序获取订单列表
router.get('/orderlist', validationMiddleware, controllers.getorderlist)

// GET !!! 小程序删除订单
router.get('/deleteorder', validationMiddleware, controllers.deleteorder)

// GET !!! 小程序用户获取自己的已发布商品
router.get('/myrelease', validationMiddleware, controllers.myrelease)

// GET !!! 小程序用户 删除 自己的已发布商品
router.get('/deletemyrelease', validationMiddleware, controllers.myreleasedelete)

// GET !!! 小程序用户 编辑 自己的已发布商品
router.post('/myreleaseedit', validationMiddleware, controllers.myreleaseedit)

// GET !!! 小程序用户 刷新 自己的已发布商品
router.get('/myreleaserefresh', validationMiddleware, controllers.myreleaserefresh)

// GET !!! 小程序用户 下架 自己的已发布商品
router.get('/myreleaseobtain', validationMiddleware, controllers.myreleaseobtain)

// GET !!! 小程序用户 重新上架 自己的已发布商品
router.get('/myreleaserelease', validationMiddleware, controllers.myreleaserelease)

// POST !!! 小程序解密手机号
router.post( '/decryptwxinfo', validationMiddleware, controllers.decryptwxinfo )

// POST !!! 小程序存储手机号(可能是解密的)
router.post( '/userphoneupload', validationMiddleware, controllers.userphoneupload )

// GET !!! 小程序用户查询是否填写了手机号
router.get( '/confirmphone', validationMiddleware, controllers.confirmphone )

// -------------

// GET!!! 小程序 获取新闻列表
router.get('/newslist', validationMiddleware, controllers.newslist)

// GET!!! 小程序 获取新闻列表
router.get('/newsdetail', validationMiddleware, controllers.newsdetail)



module.exports = router
