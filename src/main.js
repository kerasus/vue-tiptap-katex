import Vue from 'vue'
import Test from './test'
import vuetify from './plugins/vuetify' // path to vuetify export
import Notifications from 'vue-notification'

Vue.use(Notifications)

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(Test),
}).$mount('#app')
