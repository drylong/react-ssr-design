import Vue from 'vue';

import Router from 'vue-router';   //引入router模块

Vue.use(Router);  //全局注册

import login from '@/views/login.vue';
import home from '@/views/home.vue';
// import main1 from '@/components/main1.vue';
// import main2 from '@/components/main2.vue';//  () => import('@/components/main2.vue'),

const routers = new Router( {   // 创建实例
  routes: [
    {
      path: '/',
      redirect: '/home', //根目录
      meta: {
        // 需要验证的标识
        isReq: true
      },
    },
    {
      path: '/login',
      name: 'login',
      component: login,         //登录页
      title:'登录页'
    },
    {
      path: '/home',
      name: 'home',
      component: home,          //管理系统首页
      meta: {
        // 需要验证的标识
        isReq: true
      },
      children: [
        {
          path: 'accountAdd',
          name: 'accountAdd',
          component: () => import( '@/views/account/accountAdd.vue'),
        },
        {
          path: 'accountList',
          name: 'accountList',
          component: () => import( '@/views/account/accountList.vue'),
        },
        {
          path: 'changePwd',
          name: 'changePwd',
          component: () => import( '@/views/account/changePwd.vue'),
        },
        {
          path: 'menuList',
          name: 'menuList',
          component: () => import( '@/views/menu/menuList.vue'),
        },
        {
          path: 'menuAdd',
          name: 'menuAdd',
          component: () => import( '@/views/menu/menuAdd.vue'),
        },
        {
          path: 'productClassAdd',
          name: 'productClassAdd',
          component: () => import( '@/views/productclass/productClassAdd.vue'),
        },
        {
          path: 'productClassList',
          name: 'productClassList',
          component: () => import( '@/views/productclass/productClassList.vue'),
        },
        {
          path: 'productsAdd',
          name: 'productsAdd',
          component: () => import( '@/views/products/productsAdd.vue'),
        },
        {
          path: 'productsList',
          name: 'productsList',
          component: () => import( '@/views/products/productsList.vue'),
        },
        {
          path: 'sta',
          name: 'sta',
          component: () => import( '@/views/statistics/sta.vue'),
        },
        {
          path: 'stocksta',
          name: 'stocksta',
          component: () => import( '@/views/statistics/stocksta.vue'),
        },
      ]
    },
  ]
});

// 路由拦截
routers.beforeEach((to, from, next) => {
  let isLog = localStorage.getItem('token');
  let req = to.matched.some(item => item.meta.isReq);   //matched是个数组 里面是一个个路由项
  if (!isLog && req) {
    console.log(111);
    next('/login');
  } else {
    next();
  }
});

// routers.beforeEach((to, from, next) => {
//   // 根据元数据上的requiresAuth标识，对需要验证的内容进行拦截
//   if (to.meta.isReq) {
//     // 如果登录成功，有token，那么可以放行
//     const token = localStorage.getItem('token');
//     if (token) { // 有token，则放行
//       next();
//     } else {
//       // 如果未登录，没有有token，那么必须拦截
//       next('/login');
//     }
//   } else {
//     next()
//   }
// })
export default routers;    //暴露实例