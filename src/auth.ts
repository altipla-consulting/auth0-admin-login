
import createAuth0Client, { Auth0Client, IdToken } from '@auth0/auth0-spa-js'


let globalBearerToken: string
export let initClient: Promise<Client>


interface Client {
  auth0: Auth0Client
  userinfo: IdToken
}

export function bearerToken(): string {
  return globalBearerToken
}

export async function userinfo(): Promise<IdToken> {
  let { userinfo } = await initClient
  return userinfo
}

export interface Configuration {
  domain: string
  clientId: string
  audience: string
}

export function startAuth(options: Configuration) {
  if (!initClient) {
    initClient = startAuthInternal(options)
  }
}

async function startAuthInternal(options: Configuration): Promise<Client> {
  let u = new URL('https://' + window.location.host + '/accounts/login')
  u.searchParams.set('return', window.location.pathname)

  let auth0 = await createAuth0Client({
    domain: options.domain,
    client_id: options.clientId,
    audience: options.audience,
    redirect_uri: u.toString(),
  })

  if (window.location.pathname === '/accounts/login') {
    await auth0.handleRedirectCallback()
  }

  let userinfo = await auth0.getUser()
  if (!userinfo) {
    await auth0.loginWithRedirect()
    userinfo = await auth0.getUser()
  }

  globalBearerToken = await auth0.getTokenSilently()

  return {
    auth0,
    userinfo: userinfo as IdToken,
  }
}
