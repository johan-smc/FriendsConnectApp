import 'rxjs/add/observable/throw';

import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

/**
 * A processer for HTTP responses and to handle erros.
 */
@Injectable()
export class ProcessHttpmsgProvider {
  constructor(public http: HttpClient) {}

  /**
   * Extracts the body of a request and validates it's content.
   * @return {JSON} body of the request.
   */
  extractData(res: {}) {
    const body = res;
    console.log('Data received: ', body);
    return res || {};
  }

  /**
   * Handles the error that can be produced by a request to the server.
   * Prints the error in the console to help debuging.
   * @return {Observable} Possible error.
   */
  handleError(error: HttpErrorResponse) {
    let errMsg = {};
    console.log('Error catched by HttpHandler', error);
    errMsg = {status: error.status, name: error.name, message: error.message};
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
