import BootstrapVue from 'bootstrap-vue'
import '@/../bootstrap/css/bootstrap.css'
import Vue from 'vue'
import App from './App.vue'
import router from "@/routes/router";
import store from './store'
import Dashboard from '@/plugins/dashboard-plugin'

Vue.use(BootstrapVue)
Vue.use(Dashboard)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')