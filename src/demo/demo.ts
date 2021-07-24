
import { createApp } from 'vue'

import Demo from './Demo.vue'
import Auth0AdminLogin from '../lib'


let app = createApp(Demo)

app.use(Auth0AdminLogin, {
  domain: 'lavoz.eu.auth0.com',
  clientId: 'Pl3EJAR6xvtiA6WBjDfxlgAbvqFC04NM',
  redirectUri: 'https://localhost:3000/accounts/login',
  audience: 'https://glider.lavozdealmeria.com/',
})

app.mount('#app')
