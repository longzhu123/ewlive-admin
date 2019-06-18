import Vue from 'vue'
import App from './App'
import router from './router'

import './icons/iconfont.css'
import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import './styles/element-variables.scss'
import './styles/index.scss'
import 'element-ui/lib/theme-chalk/index.css'


Vue.config.productionTip = false;
Vue.use(ElementUI);
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});
