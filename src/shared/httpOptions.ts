import {HttpHeaders} from '@angular/common/http';

export const httpOptions = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization':
      'Token ' + (window.localStorage.getItem('token') || 'No Token')
});
