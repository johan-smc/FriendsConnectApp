import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

import {baseUrl} from '../../shared/baseurl';
import {ForgotPasswordData} from '../../shared/forgotPasswordData';
import {User} from '../../shared/user';
import {ProcessHttpmsgProvider} from '../process-httpmsg/process-httpmsg';
import {HttpOptionsProvider} from '../http-options/http-options';
/**
 * A manager for the request to login, register, logout and
 * all the services provided by the API that include users.
 */
@Injectable()
export class UserProvider {

  private currentUser: User;

  constructor(
    public http: HttpClient,
    private processHTTPMsgService: ProcessHttpmsgProvider,
    private storage: Storage,
    private httpOptionsService: HttpOptionsProvider,
  ) { }

  setCurrentUser(user: User): void {
    this.currentUser = user;
  }

  getCurrenUser(): User {
    return this.currentUser;
  }

  /**
   * Sends a request to login. Stores the JWT to keep making
   * requests to guarded routes of the API.
   * @param {User} userCredentials username and password to login.
   * @return {Observable<Response>} API's response.
   */
  loginUser(userCredentials: User): Observable<Response> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    const apiEndPoint = baseUrl + 'login/';
    return this.http.post(apiEndPoint, userCredentials, { headers })
      .map(res => this.processHTTPMsgService.extractData(res))
      .catch(error => this.processHTTPMsgService.handleError(error));
  }

  /**
   * Retreves the user that matches the username storage.
   * @param {void}
   * @return {Observable<User>} API's response
   */
  getUser(username: string): Observable<User> {
    console.log('Provider');

    console.log(this.currentUser);

    const apiEndPoint = baseUrl + 'users/';
    return this.http.get<User>(apiEndPoint + username, { headers: this.httpOptionsService.getHttpOptions() })
      .map(res => this.processHTTPMsgService.extractData(res))
      .catch(error => this.processHTTPMsgService.handleError(error));
  }

  putUser(username: string): Observable<string> {
    console.log('Provider2');
    const apiEndPoint = baseUrl + 'users/';
    return this.http.put<String>(apiEndPoint + username, { headers: this.httpOptionsService.getHttpOptions() })
      .map(res => this.processHTTPMsgService.extractData(res))
      .catch(error => this.processHTTPMsgService.handleError(error));
  }

  logOut(): Observable<Response> {
    console.log('Provider33');
    const apiEndPoint = baseUrl + 'login/';
    return this.http.delete(apiEndPoint, { headers: this.httpOptionsService.getHttpOptions() })
      .map(res => this.processHTTPMsgService.extractData(res))
      .catch(error => this.processHTTPMsgService.handleError(error));
  }

  /**
   * Sends a request to create a new user with the values provided by
   * the object User that goes through parameters.
   * @param {User} userCreate new user to create values.
   * @return {Observable<Response>} API's response.
   */
  createUser(userCreate: User): Observable<Response> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const apiEndPoint = baseUrl + 'users/';
    return this.http.post(apiEndPoint, userCreate, { headers })
      .map(res => this.processHTTPMsgService.extractData(res))
      .catch(error => this.processHTTPMsgService.handleError(error));
  }

  /**
   * Stores the JWT obtain in the login in the local storage.
   * @param {string} token JWT to be saved.
   */
  setToken(token: string): void {
    window.localStorage.setItem('token', token);
  }
  /**
   * Delete toket from  the local storage.
   */
  deleteToken(): void {
    window.localStorage.removeItem('token');
  }

  /**
   * Gets the JWT stored from the local storage.
   * @return {string} JWT that was stored.
   */
  getToken(): string {
    return window.localStorage.getItem('token');
  }

  /**
   * Stores the user that was logged in.
   * @param {Uset} user User to be saved.
   */
  setUser(user: User): void {
    this.storage.set('user', user);
  }

  /**
   * Sends a request to forgot passwor. Stores the JWT to keep making
   * requests to guarded routes of the API.
   * @param {email} String email of user.
   * @return {Observable<Response>} API's response.
   */
  fogotPassword(email: string): Observable<Response> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    const apiEndPoint = baseUrl + 'users/' + email + '/reset_password';
    return this.http.get(apiEndPoint, { headers })
      .map(res => this.processHTTPMsgService.extractData(res))
      .catch(error => this.processHTTPMsgService.handleError(error));
  }

  /**
   * Sends a request to reset passwor with code. Stores the JWT to keep making
   * requests to guarded routes of the API.
   * @param {data} ForgotPasswordData email of user.
   * @return {Observable<Response>} API's response.
   */
  resetPassword(data: ForgotPasswordData): Observable<Response> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    const apiEndPoint = baseUrl + 'users/' + data.email + '/reset_password';
    return this.http.post(apiEndPoint, data, { headers })
      .map(res => this.processHTTPMsgService.extractData(res))
      .catch(error => this.processHTTPMsgService.handleError(error));
  }

  /**
   * Sends a request to reset password with code. Stores the JWT to keep making
   * requests to guarded routes of the API.
   * @param {code} String email of user.
   * @return {Observable<Response>} API's response.
   */
  validateCode(user: string, code: string): Observable<Response> {
    const apiEndPoint = baseUrl + 'users/' + user + '/validate/' + code;
    return this.http.get(apiEndPoint, {headers: this.httpOptionsService.getHttpOptions()})
        .map(res => this.processHTTPMsgService.extractData(res))
        .catch(error => this.processHTTPMsgService.handleError(error));
  }

  /**
   * Re sends a request to reset password with code. Stores the JWT to keep
   * making requests to guarded routes of the API.
   * @param {code} String email of user.
   * @return {Observable<Response>} API's response.
   */
  reSendValidateCode(user: string): Observable<Response> {
    const apiEndPoint = baseUrl + 'users/' + user + '/validate';
    return this.http.get(apiEndPoint, {headers: this.httpOptionsService.getHttpOptions()})
        .map(res => this.processHTTPMsgService.extractData(res))
        .catch(error => this.processHTTPMsgService.handleError(error));
  }
}
