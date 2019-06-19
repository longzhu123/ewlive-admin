import Vue from 'vue'
import App from './App'
import router from './router'

import './icons/iconfont.css'
import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import './styles/element-variables.scss'
import './styles/index.scss'
import 'element-ui/lib/theme-chalk/index.css'
import request from '@/utils/request';

Vue.config.productionTip = false;
Vue.use(ElementUI);


//路由跳转前做判断
router.beforeEach((to, from, next) => {
  if (to.fullPath == '/login') {
    next();
  } else {
    if (localStorage.getItem('token')) {
      //访问服务器缓存数据，判断当前token是否失效
      request({
        url: process.env.BASE_API + "/sysUser/validateToken",
        method: 'post',
        data: {'token': localStorage.getItem("token")}
      }).then((resp) => {
        if (resp.resultCode === 2) {
          next('/login');
        } else {
          next();
        }
      });
    } else {
      next('/login');
    }

  }
});

new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});
