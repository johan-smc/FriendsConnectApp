import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

/**
 * A processer for HTTP responses and to handle erros.
 */
@Injectable()
export class ProcessHttpmsgProvider {

  constructor(public http: HttpClient) { }

  /**
   * Extracts the body of a request and validates it's content.
   * @return {JSON} body of the request.
   */
  public extractData(res: any) {
    let body = res;
    console.log(body);
    return res || {};
  }

  /**
   * Handles the error that can be produced by a request to the server.
   * @return {Observable} Possible error.
   */
  public handleError(error: HttpErrorResponse) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: Object;
    console.log(error); //TODO - Delte
    errMsg = {
      status: error.status,
      name: error.name,
      message: error.message
    };
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
