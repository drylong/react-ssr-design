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
      redirect:  '/home'       //根目录
    },
    {
      path: '/login',
      name: 'login',
      component: login,         //登录页
      
    },
    {
      path: '/home',
      name: 'home',
      component: home,          //管理系统首页
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

export default routers;    //暴露实例