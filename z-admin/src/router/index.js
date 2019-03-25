import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/example',
    name: 'example',
    hidden: true
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '老师审核', icon: 'teacher' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '老师待审核', icon: 'table' }
      },
      {
        path: 'teacheraudited',
        name: 'Teacheraudited',
        component: () => import('@/views/teacheraudited/index'),
        meta: { title: '老师已通过', icon: 'table' }
      },
      {
        path: 'teacherrejected',
        name: 'Teacherrejected',
        component: () => import('@/views/teacherrejected/index'),
        meta: { title: '老师已驳回', icon: 'table' }
      },
      {
        path: 'teacherdetail/:openid',
        name: 'Teacherdetail',
        hidden: true,
        component: () => import('@/views/teacherdetail/index'),
        meta: { title: '老师详情', icon: 'table' }
      },
      {
        path: 'teachercreate',
        name: 'Teachercreate',
        component: () => import('@/views/teachercreate/index'),
        meta: { title: '创建老师', icon: 'table' }
      }
    ]
  },
  {
    path: '/student',
    component: Layout,
    redirect: '/student/studentapply',
    name: 'Student',
    meta: { title: '学员审核', icon: 'student' },
    children: [
      {
        path: 'studentapply',
        name: 'Studentapply',
        component: () => import('@/views/studentapply/index'),
        meta: { title: '学员待审核', icon: 'tree' }
      },
      {
        path: 'studentlist',
        name: 'Studentlist',
        component: () => import('@/views/studentlist/index'),
        meta: { title: '学员已通过', icon: 'tree' }
      },
      {
        path: 'deletedstudent',
        name: 'Deletedstudent',
        component: () => import('@/views/studentdeleted/index'),
        meta: { title: '学员已驳回', icon: 'tree' }
      },
      {
        path: 'studentdetail/:openid/:randomstr',
        name: 'Studentdetail',
        hidden: true,
        component: () => import('@/views/studentdetail/index'),
        meta: { title: '学员详情', icon: 'tree' }
      },
      {
        path: 'studentcreate',
        name: 'Studentcreate',
        component: () => import('@/views/studentcreate/index'),
        meta: { title: '创建学员', icon: 'tree' }
      },
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order/summary',
    name: 'Order',
    meta: { title: '订单数据', icon: 'order' },
    children: [
      {
        path: 'summary',
        name: 'Summary',
        component: () => import('@/views/ordersummary/index'),
        meta: { title: '订单汇总', icon: 'tree' }
      },
      {
        path: 'orderlist',
        name: 'Orderlist',
        component: () => import('@/views/orderlist/index'),
        meta: { title: '订单列表', icon: 'tree' }
      }
    ]
  },
  {
    path: '/price',
    component: Layout,
    redirect: '/price/index',
    name: 'Price',
    meta: { title: '产品定价', icon: 'price' },
    children: [
      {
        path: 'index',
        name: 'Priceindex',
        component: () => import('@/views/price/index'),
        meta: { title: '产品定价', icon: 'price' }
      }
    ]
  },
  {
    path: '/wxsms',
    component: Layout,
    redirect: '/wxsms/index',
    name: 'Wxsms',
    meta: { title: '通知设置', icon: 'wxsms' },
    children: [
      {
        path: 'index',
        name: 'Wxsmsindex',
        component: () => import('@/views/wxsms/index'),
        meta: { title: '短信通知设置', icon: 'wxsms' }
      }
    ]
  },
  {
    path: '/newsrelease',
    component: Layout,
    redirect: '/newsrelease/index',
    name: 'Newsrelease',
    meta: { title: '新闻发布', icon: 'wxsms' },
    children: [
      {
        path: 'index',
        name: 'Newsrelease',
        component: () => import('@/views/newsrelease/index'),
        meta: { title: '新闻发布', icon: 'wxsms' }
      }
    ]
  },
  {
    path: 'minappdata',
    component: Layout,
    children: [
      {
        path: 'https://mp.weixin.qq.com/',
        meta: { title: '小程序运营数据', icon: 'link' }
      }
    ]
  },
  {
    path: 'mpkf',
    component: Layout,
    children: [
      {
        path: 'https://mpkf.weixin.qq.com/',
        meta: { title: '微信客服系统', icon: 'link' }
      }
    ]
  },
  {
    path: 'wxpay',
    component: Layout,
    children: [
      {
        path: 'https://pay.weixin.qq.com/index.php/core/home/login',
        meta: { title: '微信商户支付系统', icon: 'link' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
