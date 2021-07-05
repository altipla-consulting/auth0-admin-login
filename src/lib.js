
import { Icon } from '@altipla/fa5-icon'

import WaitLogin from './components/WaitLogin.vue'
import { startAuth, loadedPromise } from './auth.js'
import './icons'
import './styles.css'


export { bearerToken, userinfo } from './auth.js'


export default {
  install(app, options) {
    startAuth(options)
    app.component(Icon.name, Icon)
    app.component(WaitLogin.name, WaitLogin)
  },
}


export async function logout() {
  let client = await loadedPromise
  await client.logout()
}
