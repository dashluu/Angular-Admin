import { Injectable } from '@angular/core';
import { Observable, of, EMPTY } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface Credentials {
  // Customize received credentials here
  username: string;
  token: string;
}

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

const credentialsKey = 'credentials';

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {

  private _credentials: Credentials | null;

  constructor(
    private http: HttpClient
  ) {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  /**
   * Authenticates the user.
   * @param {LoginContext} context The login parameters.
   * @return {Observable<Credentials>} The user credentials.
   */
  login(context: LoginContext): Observable<Credentials> {
    // Replace by proper authentication call
    let url: string = "/Users/Login";

    let loginData = {
      UserName: context.username,
      Password: context.password,
      IsPersistent: context.remember
    };

    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let observableCredentials: Observable<Credentials> = this.http.post(
      url,
      JSON.stringify(loginData),
      options
    ).pipe(map(object => {
      if (object["data"]) {
        let credentials: Credentials = {
          username: context.username,
          token: '123456'
        };

        this.setCredentials(credentials, context.remember);

        return credentials;
      } else {
        throw new Error("Username or password not found.");
      }
    }));

    return observableCredentials;
  }

  /**
   * Logs out the user and clear credentials.
   * @return {Observable<boolean>} True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    let url: string = "/Users/Logout";

    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let observableBoolean = this.http.post(
      url, 
      "", 
      options
    ).pipe(map(object => {
      if (object["status"] === 200) {
        this.setCredentials();
        return true;
      } else {
        throw new Error("User is not logged in.");
      }
    }));
    
    return observableBoolean;
  }

  /**
   * Checks is the user is authenticated.
   * @return {boolean} True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Gets the user credentials.
   * @return {Credentials} The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param {Credentials=} credentials The user credentials.
   * @param {boolean=} remember True to remember credentials across sessions.
   */
  private setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }

}
