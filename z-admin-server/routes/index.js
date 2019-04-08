/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/admin'   // 定义所有路由的前缀都已 /weapp 开头
})
// const xmlParser = require('koa-xml-body');

const controllers = require('../controllers')

const fs = require('fs')

// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')


// --- 图片上传 Demo --- //
// 图片上传接口，端可以直接将 url 填入 wx.uploadFile 中 /weapp/upload
router.post('/upload', controllers.upload)

// GET !!! 打开后台
// router.get('/', controllers.home)
router.get('/home', function(ctx, next){
    ctx.response.type = 'html';
    console.log(__dirname);
    
    ctx.response.body = fs.createReadStream( 'web/index.html' );
})


// POST !!! 后台登录
router.post('/adminlogin', controllers.userlogin)

// POST !!! 后台管理员信息
router.get('/info', controllers.userinfo)

// GET !!! 查询首页轮播图
router.get('/swiperlist', controllers.getswiperlist)

//-------------------------------
// GET !!! 查询老师申请列表
router.get('/teacherapplylist', controllers.getteacherapply)

// GET !!! 老师申请审批操作
router.get('/teacherapplyaudit', controllers.teacherapplyaudit)

// GET !!! 查询已通过老师列表 (含正常和驳回)
router.get('/teacherlist', controllers.getteacherlist)

// GET !!! 查询老师详情
router.get('/teacherdetail', controllers.getteacherdetail)

// GET !!! 恢复已删老师
router.get('/teacherrecovery',  controllers.teacherrecovery)

// POST !!! 管理员添加老师
router.post('/adminaddteacher',  controllers.adminaddteacher)
//-------------------------------
// GET !!! 查询学员申请列表
router.get('/studentapplylist', controllers.getstudentapply)

// GET !!! 学员申请审批操作
router.get('/studentapplyaudit', controllers.studentapplyaudit)

// GET !!! 查询学员列表 (含正常和驳回)
router.get('/studentlist', controllers.getstudentlist)

// GET !!! 查询已驳回学员列表
router.get('/deletedstudentlist', controllers.getdeletedstudentlist)

// GET !!! 查询学员详情
router.get('/studentdetail',  controllers.getstudentdetail)

// GET !!! 删除学员
router.get('/studentdelete',  controllers.studentdelete)

// GET !!! 恢复已删学员
router.get('/studentrecovery',  controllers.studentrecovery)

// POST !!! 管理员添加学员
router.post('/adminaddstudent',  controllers.adminaddstudent)
//-------------------------------
// GET !!! 获取订单列表
router.get('/ordersummary',  controllers.getordersummary)

// GET !!! 获取订单列表
router.get('/orderlist',  controllers.getorderlist)


//-------------------------------
// GET !!! admin 查询产品价格
router.get('/pricemodify', controllers.pricemodify)

// GET !!! admin 修改产品价格
router.get('/price', controllers.price)

//-------------------------------

// GET!!! admin 查询短信通知成员wxsmsuser
router.get('/wxsmsuser', controllers.wxsmsuser)

// POST!!! admin 添加短信通知成员wxsmsuser
router.post('/wxsmsuseradd', controllers.wxsmsuseradd)

// GET!!! admin 删除短信通知成员wxsmsuser
router.post('/wxsmsuserdelete', controllers.wxsmsuserdelete)

//-------------------------------
// POST!!! admin 发布新闻
router.post('/newsrelease', controllers.newsrelease)

// GET!!! 小程序 获取新闻列表
router.post('/newslist', controllers.newslist)

// GET!!! 小程序 获取新闻列表
router.post('/newsdetail', controllers.newsdetail)

module.exports = router
