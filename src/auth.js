
import createAuth0Client from '@auth0/auth0-spa-js'


let globalUserinfo
let globalBearerToken
export let loadedPromise


export function startAuth(options) {
  loadedPromise = loadClient(options)
}


export function bearerToken() {
  return globalBearerToken
}


export function userinfo() {
  return globalUserinfo
}


async function loadClient(options) {
  let u = new URL(options.redirectUri)
  u.searchParams.set('returnUrl', window.location.pathname)

  let client = await createAuth0Client({
    domain: options.domain,
    client_id: options.clientId,
    redirect_uri: u.toString(),
  })

  if (window.location.pathname === '/accounts/login') {
    await client.handleRedirectCallback()
    let u = new URL(window.location.href)
    u.pathname = u.searchParams.get('returnUrl')
    u.searchParams.delete('returnUrl')
    location.href = u.toString()
    return
  }

  globalUserinfo = await client.getUser()
  if (!globalUserinfo) {
    await client.loginWithRedirect()
  }

  globalBearerToken = await client.getTokenSilently()

  return client
}
