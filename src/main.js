import Vue from 'vue'
import App from './App.vue'
// 引入路由
import routers from '@/router/index.js'
// 引入element
import Element from 'element-ui';
// 引入样式 、或者自定义的主题
import 'element-ui/lib/theme-chalk/index.css';
import '@/theme/element/index.css';
// 引入重置样式
import 'normalize.css';
// 引入全局样式
import '@/assets/style/css/common.css';

// 全局注册
Vue.use(Element);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router: routers,    //注意这里******************
  render: h => h(App),
}).$mount('#app')
