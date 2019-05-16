import { Injectable } from '@angular/core';
import { AUTH_CONFIG } from './auth0-variables';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _idToken: string;
  private _accessToken: string;
  private _expiresAt: number;

  private _auth0;

  constructor(public router: Router) {

    let idToken = sessionStorage.getItem("idToken");
    let accessToken = sessionStorage.getItem("accessToken");
    let expiresAt = sessionStorage.getItem("expiresAt");

    if(idToken && accessToken) {
      // console.log("adding tokens");
    this._idToken = idToken;
    this._accessToken = accessToken;
    this._expiresAt = parseInt(expiresAt);    
    } else {
      // console.log("not adding tokens");
      this._idToken = '';
      this._accessToken = '';
      this._expiresAt = 0;
    }

    const { AuthConfig } = environment;

    this._auth0 = new auth0.WebAuth({
      clientID: AUTH_CONFIG.clientID,
      domain: AUTH_CONFIG.domain,
      responseType: 'token id_token',
      redirectUri: AUTH_CONFIG.callbackURL,
      audience: 'benchstrengthapi'
    });
  }

  get accessToken(): string {
    return this._accessToken;
  }

  get idToken(): string {
    return this._idToken;
  }

  public login(): void {
    this._auth0.authorize();
  }

  public handleAuthentication(): void {
    this._auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.localLogin(authResult);
        this.router.navigate(['/user']);
      } else if (err) {
        this.router.navigate(['/login']);
        // console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  private localLogin(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = (authResult.expiresIn * 1000) + Date.now();
    this._accessToken = authResult.accessToken;
    this._idToken = authResult.idToken;
    this._expiresAt = expiresAt;

    sessionStorage.setItem("accessToken", authResult.accessToken);
    sessionStorage.setItem("idToken", authResult.idToken);
    sessionStorage.setItem("expiresAt", expiresAt.toString());
  }

  public renewTokens(): void {
    this._auth0.checkSession({}, (err, authResult) => {
       if (authResult && authResult.accessToken && authResult.idToken) {
         this.localLogin(authResult);
       } else if (err) {
         alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
         this.logout();
       }
    });
  }

  public logout(): void {
    // Remove tokens and expiry time
    this._accessToken = '';
    this._idToken = '';
    this._expiresAt = 0;
    sessionStorage.clear();
    this._auth0.logout({
      returnTo: "http://localhost:4200/login"
    });
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    return this._accessToken && Date.now() < this._expiresAt;
  }

  

}
