import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

/**
 * A processer for HTTP responses and to handle erros.
 */
@Injectable()
export class ProcessHttpmsgProvider {

  constructor(public http: HttpClient) {
    //console.log('Hello ProcessHttpmsgProvider Provider');
  }

  /**
   * Extracts the body of a request and validates it's content.
   * @return {JSON} body of the request.
   */
  public extractData(res: any) {
    // TODO - Delete logs
    /*
    console.log( "entre a extract data ...");
    console.log(res);
    let body = res.json();
    console.log(body);
    // body.status = res.status;
    */
    return res || {};
  }

  /**
   * Handles the error that can be produced by a request to the server.
   * @return {Observable} Possible error.
   */
  public handleError (res: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    // TODO - Delete logs and verify comments in the function
    let errMsg: Object;
    console.log("Here in errors");
    console.log(res);
    console.log("tipo....");
    console.log(typeof res);
    if (res instanceof Response) {
      console.log("testst....");
      console.log(res);
       const body = res.json() || '';
       console.log(body);
      // const err = body.error || JSON.stringify(body);
      errMsg = {
        status: res.status,
        //name: err.name,
        //message: err.message
      };
    } else {
      errMsg = { message: res.message ? res.message : res.toString() };
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
