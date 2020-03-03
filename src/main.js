import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Index from './components/Index';
import ListView from './components/ListView';
import ListView2 from './components/ListView2';
import Detail from './components/Detail';
import ImgToTxt from './components/cloud_baidu/imgToTxt';

Vue.use(VueRouter);
Vue.use(ElementUI);

const router = new VueRouter({
  mode: 'history',
  base: '/myVue/',
  routes: [
    {
      path: '/', component: Index
    }, {
      path: '/list1', component: ListView
    }, {
      // 无效
      path: '/list2', 
      component: ListView2,
      meta:{
        keepAlive: true,
        saveSrollTop: true,
      }
    }, {
      path: '/list3', 
      component: ListView,
      meta:{
        keepAlive: true,
        saveSrollTop: true,
      }
    }, {
      path: '/detail', component: Detail
    }, {
      path: '/imgToTxt', component: ImgToTxt
    }
  ],
  // 方法二添加
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      if (from.meta.saveSrollTop) {
        from.meta.savedPosition = document.documentElement.scrollTop || document.body.scrollTop;
      }
      return {x: 0, y: from.meta.savedPosition};
    }
  },
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
