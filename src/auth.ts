
import createAuth0Client, { Auth0Client, IdToken } from '@auth0/auth0-spa-js'


let globalBearerToken: string
export let load: Promise<Client>


export interface PluginOptions {
  domain: string
  clientId: string
  audience: string
}

export function startAuth(options: PluginOptions) {
  load = loadClient(options)
}

export function bearerToken(): string {
  return globalBearerToken
}

export async function userinfo(): Promise<IdToken> {
  let { userinfo } = await load
  return userinfo
}

interface Client {
  auth0: Auth0Client
  userinfo: IdToken
}

async function loadClient(options: PluginOptions): Promise<Client> {
  let u = new URL('https://' + window.location.host + '/accounts/login')
  u.searchParams.set('returnUrl', window.location.pathname)

  let client = await createAuth0Client({
    domain: options.domain,
    client_id: options.clientId,
    audience: options.audience,
    redirect_uri: u.toString(),
  })

  if (window.location.pathname === '/accounts/login') {
    await client.handleRedirectCallback()
    let u = new URL(window.location.href)
    u.pathname = u.searchParams.get('returnUrl') || ''
    u.searchParams.delete('returnUrl')
    location.href = u.toString()
    // @ts-ignore
    return
  }

  let userinfo = await client.getUser()
  if (!userinfo) {
    await client.loginWithRedirect()
  }

  globalBearerToken = await client.getTokenSilently()

  return {
    userinfo: userinfo as IdToken,
    auth0: client,
  }
}
