function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
                    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function clientIdNew(clientID, clientScr, authScopes) {
  var auth = new RefreshToken(new ClientID(clientID, clientScr, authScopes))
  auth.New()
  return auth.authURL
}

function clientIdGetRefresh(clientID, clientScr, authScopes, accessCode) {
  var auth = new RefreshToken(new ClientID(clientID, clientScr, authScopes))
  auth.Gen(accessCode)
  return JSON.stringify(auth.token)
}

function clientIDGetAccess(clientID, clientScr, authScopes, refreshToken) {
  var auth = new RefreshToken(new ClientID(clientID, clientScr, authScopes))
  auth.Refresh(refreshToken)
  return JSON.stringify(auth.token)
}

function serviceAccountAuth(svAccount, key, scopes, sub) {
  var auth = new JWT(new ServiceAccount(svAccount, key, scopes, sub))
  auth.Gen()
  return JSON.stringify(auth.token)
}
