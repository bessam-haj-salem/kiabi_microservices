import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   
      // console.log(request)
      let token = sessionStorage.getItem("token")
//  console.log(token)
    let modifiedReq = request.clone({
      
      headers: new HttpHeaders({  "Authorization": `Bearer ${token}`}),

     
    });
    // modifiedReq = request.clone()
    // console.log(modifiedReq)
    return next.handle(modifiedReq);
  }
}
