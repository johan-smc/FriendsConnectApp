import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
/*
  Generated class for the HttpOptionsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpOptionsProvider {

  constructor(public http: HttpClient) {
  }

  getHttpOptions()
  {
    let httpOptions = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':
          'Token ' + (window.localStorage.getItem('token') || 'No Token')
    });
    return httpOptions;
  }
}
