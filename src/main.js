import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from '@/store'
Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.serverUrl = 'http://192.168.1.4:80'

new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')
