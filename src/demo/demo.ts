
import { createApp } from 'vue'
import Hermes from '@altipla/hermes'

import Demo from './Demo.vue'
import DemoLayout from './DemoLayout.vue'
import { Authenticator } from '../lib'


let app = createApp(DemoLayout)

let auth = new Authenticator({
  domain: 'lavoz.eu.auth0.com',
  clientId: 'E1ygFQnOktNc5DqDzgyUIQzaAllIhORk',
  audience: 'https://glider.lavozdealmeria.com/',
})
app.use(Hermes, auth.configureHermes({
  routes: [
    { path: '/', component: Demo },
  ],
}))

app.mount('#app')
