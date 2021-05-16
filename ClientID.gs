class ClientID {
  constructor(clientID, clientScr, authScopes) {
    this.id = clientID;
    this.secret = clientScr;
    this.scopes = authScopes;

    return this
  }
}

class RefreshToken {
  constructor(clientID) {
    this.clientID = clientID
    this.authURL;
    this.tokenURL = `https://accounts.google.com/o/oauth2/token`
    this.token;

    this.New = function() {
      var urlSafe;
      
      try {
        urlSafe = encodeURIComponent(this.clientID.scopes)
      } 
      catch(err) {
        console.error(`Unable to encode provided scopes: ${err}`)
        urlSafe = ""
      }
       
      this.authURL = `https://accounts.google.com/o/oauth2/auth?client_id=${this.clientID.id}&redirect_uri=urn%3Aietf%3Awg%3Aoauth%3A2.0%3Aoob&response_type=code&access_type=offline&prompt=consent&scope=${urlSafe}`
    }

    this.Gen = function(accessCode) {

      var options = {
        "method" : "POST",
        "payload" : {
          "code": accessCode,
          "client_id": this.clientID.id,
          "client_secret": this.clientID.secret,
          "redirect_uri": `urn:ietf:wg:oauth:2.0:oob`,
          "grant_type": `authorization_code`
          }
        };      
      var response;

      try {
        response = JSON.parse(UrlFetchApp.fetch(this.tokenURL, options).getContentText())
        this.token = new OAuth(response.access_token, response.expires_in, response.scope, response.refresh_token)
      }
      catch(err) {
        console.error(`Unable to generate a refresh token: ${err}`)
      }
    }

    this.Refresh = function(refresh) {
      if (!this.token) {
        this.token = new OAuth(null, null, this.clientID.scopes, refresh)
      }

      //var curDate = new Date()
      //if (curDate.getTime() < this.token.expiry.getTime()) {
      var options = {
        "method" : "POST",
        "payload" : {
          "client_id": this.clientID.id,
          "client_secret": this.clientID.secret,
          "refresh_token": this.token.refreshToken,
          "grant_type": `refresh_token`            
          }
        };
      var response;

      try {
        response = JSON.parse(UrlFetchApp.fetch(this.tokenURL, options).getContentText())
        this.token = new OAuth(response.access_token, response.expires_in, response.scope, this.token.refreshToken)
      }
      catch(err) {
        console.error(`Unable to refresh the access token: ${err}`)
      }          
      //}
    }

    return this
  }
}
