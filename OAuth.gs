class OAuth {
  constructor(accessToken, expiry, scopes, refreshToken) {
    this.accessToken = accessToken;
    this.expiry = new Date(new Date().getTime() + (expiry * 1000));
    this.scopes = scopes;
    this.refreshToken = refreshToken;

    return this
  }
}
