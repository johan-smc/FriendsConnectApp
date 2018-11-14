import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Activity} from '../../shared/activity';
import {baseUrl} from '../../shared/baseurl';
import {ProcessHttpmsgProvider} from '../process-httpmsg/process-httpmsg';
import {HttpOptionsProvider} from '../http-options/http-options';
/**
 * A manager to access the table Activity in the backend.
 */
@Injectable()
export class ActivityProvider {

  readonly END_POINT: string = baseUrl + 'activities/';

  constructor(
      public http: HttpClient,
      private processHTTPMsgService: ProcessHttpmsgProvider,
      private httpOptionsService: HttpOptionsProvider,
  ) {}

  /**
   * Retreves all the activities from the data base.
   * @return {Observable<Activity[]>} API's response
   */
  getAllActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.END_POINT, {headers: this.httpOptionsService.getHttpOptions()})
        .map(res => this.processHTTPMsgService.extractData(res))
        .catch(error => this.processHTTPMsgService.handleError(error));
  }

  /**
   * Send activity to create in data base.
   * @return {Observable<Response>} API's response
   */
  postActivity(activity: Activity): Observable<Response> {
    return this.http.post<Response>(this.END_POINT,activity, {headers: httpOptions})
        .map(res => this.processHTTPMsgService.extractData(res))
        .catch(error => this.processHTTPMsgService.handleError(error));
  }

  /**
   * Retreves the activity that matches the id sent in the parameters.
   * @param {number} id Activity's ID
   * @return {Observable<Activity>} API's response
   */
  getActivityById(id: number): Observable<Activity> {
    return this.http.get<Activity>(this.END_POINT + id, {headers: this.httpOptionsService.getHttpOptions()})
        .map(res => this.processHTTPMsgService.extractData(res))
        .catch(error => this.processHTTPMsgService.handleError(error));
  }

  /**
   * Subscribes the activity to the current logged user.
   * @param {number} activityId Activity's ID
   * @param {string} username current user username
   * @return {Observable<Response>} API's response
   */
  subscribeToActivity(activityId: number, username: string): Observable<Response> {
    const endPoint = baseUrl + 'users/' + username + '/activities/' + activityId;
    return this.http.post(endPoint, null, {headers: this.httpOptionsService.getHttpOptions()})
      .map(res => this.processHTTPMsgService.extractData(res))
      .catch(error => this.processHTTPMsgService.handleError(error));
  }

  /**
   * Un subscribes the activity to the current logged user.
   * @param {number} activityId Activity's ID
   * @param {string} username current user username
   * @return {Observable<Activity>} API's response
   */
  unSubscribeToActivity(activityId: number, username: string): Observable<Activity> {
    const endPoint = baseUrl + 'users/' + username + '/activities/' + activityId;
    return this.http.delete(endPoint, {headers: this.httpOptionsService.getHttpOptions()})
      .map(res => this.processHTTPMsgService.extractData(res))
      .catch(error => this.processHTTPMsgService.handleError(error));
  }

  /**
   * Retreves the suscribe activies with the username sent in the parameters.
   * @param {string} username User username
   * @return {Observable<Activity[]>} API's response
   */
  getMyActivities(username: string): Observable<Activity[]> {
    return this.http.get<Activity>(baseUrl+'users/' + username+ '/activities', {headers: this.httpOptionsService.getHttpOptions()})
        .map(res => this.processHTTPMsgService.extractData(res))
        .catch(error => this.processHTTPMsgService.handleError(error));
  }

  /**
   * Retreves the own activies with the username sent in the parameters.
   * @param {string} username User username
   * @return {Observable<Activity>} API's response
   */
  getOwnActivities(username: string): Observable<Activity[]> {
    return this.http.get<Activity>(baseUrl+'users/' + username+ '/activities/own', {headers: this.httpOptionsService.getHttpOptions()})
        .map(res => this.processHTTPMsgService.extractData(res))
        .catch(error => this.processHTTPMsgService.handleError(error));
  }
}
