import Vue from 'vue'
import Test from './test'

Vue.config.productionTip = false

new Vue({
  render: h => h(Test),
}).$mount('#app')
