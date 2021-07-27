import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import "bootstrap/dist/css/bootstrap.css";


Vue.config.productionTip = false


import vueDebounce from 'vue-debounce'
Vue.use(vueDebounce)

import SpinnerPlugin  from 'bootstrap-vue'
Vue.use(SpinnerPlugin)

import { FormCheckboxPlugin } from 'bootstrap-vue'
Vue.use(FormCheckboxPlugin)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
