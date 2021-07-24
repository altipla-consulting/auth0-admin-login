
import { App } from 'vue'

import { startAuth, load, PluginOptions } from './auth'


export default {
  install(app: App, options: PluginOptions) {
    startAuth(options)
  },
}

export { bearerToken, userinfo } from './auth'

export async function logout() {
  let client = await load
  await client.auth0.logout()
}
