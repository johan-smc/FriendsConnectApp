import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Comment } from '../../shared/comment';
import { baseUrl } from '../../shared/baseurl';
import { ProcessHttpmsgProvider } from '../process-httpmsg/process-httpmsg';
import {HttpOptionsProvider} from '../http-options/http-options';

/*
  Generated class for the CommentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommentProvider {

  constructor(
    public http: HttpClient,
    private processHTTPMsgService: ProcessHttpmsgProvider,
    private httpOptionsService: HttpOptionsProvider,
  ) { }

  /**
   * Retreves all the activities comments.
   * @return {Observable<Comment[]>} API's response
   */
  getAllActivitiyComments(activityId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.getEndPoint(activityId), { headers: this.httpOptionsService.getHttpOptions() })
      .map(res => this.processHTTPMsgService.extractData(res))
      .catch(error => this.processHTTPMsgService.handleError(error));
  }

  /**
   * Creates a comment to an specific activity.
   * @param activityId Activity to add comment
   * @param comment Content of comment
   * @return API's response
   */
  createComment(activityId: number, comment: Comment): Observable<Response> {
    return this.http.post(this.getEndPoint(activityId), comment, {headers: this.httpOptionsService.getHttpOptions()})
      .map(res => this.processHTTPMsgService.extractData(res))
      .catch(error => this.processHTTPMsgService.handleError(error));
  }

  /**
   * Generates the endpoint for an specific activity.
   * @param activityId Activity to edits comments
   */
  private getEndPoint(activityId: number): string {
    return baseUrl + 'activities/' + activityId + '/comments';
  }

}
