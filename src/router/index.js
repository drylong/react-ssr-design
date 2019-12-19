import Vue from 'vue';

import Router from 'vue-router';   //引入router模块

Vue.use(Router);  //全局注册

import login from '@/views/login.vue';
import home from '@/views/home.vue';
import main1 from '@/components/main1.vue';
import main2 from '@/components/main2.vue';

const routers = new Router( {   // 创建实例
  routes: [
    {
      path: '/',
      redirect:  '/home'
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children: [
        {
          path: 'main1',
          name: 'main1',
          component: main1,
        },
        {
          path: 'main2',
          name: 'main2',
          component: main2,
        }
      ]
    },
    
  ]
});

export default routers;    //暴露实例