import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { User } from '../../shared/user';
import { ProcessHttpmsgProvider } from '../process-httpmsg/process-httpmsg';
import { baseUrl } from '../../shared/baseurl';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import { Storage } from '@ionic/storage';

/**
 * A manager for the request to login, register, logout and
 * all the services provided by the API that include users.
 */
@Injectable()
export class UserProvider {
  

  constructor(
    public http: HttpClient,
    private processHTTPMsgService : ProcessHttpmsgProvider,
    private storage: Storage,
    ) { }

  /**
  * Sends a request to login. Stores the JWT to keep making
  * requests to guarded routes of the API.
  * @param {User} userCredentials username and password to login.
  * @return {Observable<Response>} API's response.
  */

  loginUser(userCredentials: User): Observable<Response> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type','application/json');
    let apiEndPoint = baseUrl + 'login/';
    return this.http.post(apiEndPoint, userCredentials, {headers: headers})
      .map(res => { return this.processHTTPMsgService.extractData(res); })
      .catch(error => { return this.processHTTPMsgService.handleError(error) });
  }

  createUser(userCreate: User):  Observable<Response> {
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    let apiEndPoint = baseUrl + 'users/';
    return this.http.post(apiEndPoint,userCreate ,{headers: headers})
      .map(res => { return this.processHTTPMsgService.extractData(res); })
      .catch(error => { return this.processHTTPMsgService.handleError(error) });
  
  setToken(token: any): any {
    window.localStorage.setItem('token', token);
  }
  getToken(): any
  {
    return window.localStorage.getItem('token');
  }
  setUser(user: User): any {
    this.storage.set('user', user);
  }
}
