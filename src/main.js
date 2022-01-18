import { createApp } from 'vue'
import Test from './test'
import Notifications from '@kyvg/vue3-notification'

export const eventBus = createApp(Test)

const app = createApp(Test).mount('#app')

app.use(Notifications)