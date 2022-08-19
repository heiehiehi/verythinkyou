import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from '@/store'
import md5 from 'js-md5'
Vue.use(ElementUI)

Vue.prototype.$md5 = md5;
Vue.config.productionTip = false
Vue.prototype.serverUrl = 'http://192.168.1.2:80'

new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')
