import Vue from 'vue'
import Test from './test'
import Notifications from 'vue-notification'

Vue.use(Notifications)

Vue.config.productionTip = false

new Vue({
  render: h => h(Test),
}).$mount('#app')
