
import { PluginOptions as HermesPluginOptions } from '@altipla/hermes'

import { startAuth, initClient, Configuration } from './auth'
import Login from './components/Login.vue'


export { bearerToken, userinfo } from './auth'
export type { Configuration } from './auth'


export async function logout() {
  let client = await initClient
  await client.auth0.logout()
}


export class Authenticator {
  constructor(private configuration: Configuration) { }

  configureHermes(opts: HermesPluginOptions): HermesPluginOptions {
    return {
      ...opts,
      routes: [
        { path: '/accounts/login', component: Login },
        ...opts.routes,
      ],
      beforeEach: async (to) => {
        startAuth(this.configuration)
        await initClient
        opts.beforeEach && await opts.beforeEach(to)
      },
    }
  }
}
