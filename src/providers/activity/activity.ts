import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Activity} from '../../shared/activity';
import {baseUrl} from '../../shared/baseurl';
import {httpOptions} from '../../shared/httpOptions';
import {ProcessHttpmsgProvider} from '../process-httpmsg/process-httpmsg';

/**
 * A manager to access the table Activity in the backend.
 */
@Injectable()
export class ActivityProvider {
  readonly END_POINT: string = baseUrl + 'activities/';

  constructor(
      public http: HttpClient,
      private processHTTPMsgService: ProcessHttpmsgProvider,
  ) {}

  /**
   * Retreves all the activities from the data base.
   * @return {Observable<Activity[]>} API's response
   */
  getAllActivities(): Observable<Activity[]> {
    return this.http.get(this.END_POINT, {headers: httpOptions})
        .map(res => this.processHTTPMsgService.extractData(res))
        .catch(error => this.processHTTPMsgService.handleError(error));
  }

  /**
   * Retreves the activity that matches the id sent in the parameters.
   * @param {number} id Activity's ID
   * @return {Observable<Activity>} API's response
   */
  getActivityById(id: number): Observable<Activity> {
    return this.http.get<Activity>(this.END_POINT + id, {headers: httpOptions})
        .map(res => this.processHTTPMsgService.extractData(res))
        .catch(error => this.processHTTPMsgService.handleError(error));
  }
}
