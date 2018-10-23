import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import { Activity } from '../../shared/activity';
import { ProcessHttpmsgProvider } from '../process-httpmsg/process-httpmsg';
import { UserProvider } from '../user/user';
import { baseUrl } from '../../shared/baseurl';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import { Activity } from '../../shared/activity';

/*
  Generated class for the ActivityProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ActivityProvider {

  constructor(
    public http: HttpClient,
    private processHTTPMsgService : ProcessHttpmsgProvider,
    private userProvider : UserProvider,
    ) {
    //console.log('Hello ActivityProvider Provider');
  }

  getAllActivities() : Observable<Response>{
    let headers = this._addStandardHeaders(new HttpHeaders);
    // TODO - changue url
    let apiEndPoint = baseUrl + 'activities/';
    return this.http.get(apiEndPoint, {headers: headers})
      .map(res => { return this.processHTTPMsgService.extractData(res); })
      .catch(error => { return this.processHTTPMsgService.handleError(error) });
  }

  getActivityById(id) : Observable<Response>{
    let headers = this._addStandardHeaders(new HttpHeaders);
    // TODO - changue url
    let apiEndPoint = baseUrl + 'activity/'+ id;
    return this.http.get<Activity>(apiEndPoint, {headers: headers})
      .map(res => { return this.processHTTPMsgService.extractData(res); })
      .catch(error => { return this.processHTTPMsgService.handleError(error) });
  }

  suscribeToActivity(id) : Observable<Response>{
    let headers = this._addStandardHeaders(new HttpHeaders);
    // TODO - changue url
    let apiEndPoint = baseUrl + 'activity/'+ id;
    return this.http.post(apiEndPoint, {headers: headers})
      .map(res => { return this.processHTTPMsgService.extractData(res); })
      .catch(error => { return this.processHTTPMsgService.handleError(error) });
  }

  public _addStandardHeaders(header:HttpHeaders)
  {
    // TODO - header = header.set maybe not correct
    header = header.set('Content-Type','application/json');
    // TODO - Verify get token, is correct the method?
    let token = 'Token '+ this.userProvider.getToken();
    header = header.set('Authorization', token);
    return header;
  }
}
