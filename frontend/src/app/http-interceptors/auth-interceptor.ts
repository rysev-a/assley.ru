import * as Cookies from 'js-cookie';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = this.getAccessToken();

    if (accessToken) {
      const authReq = req.clone({
        headers: req.headers.set('Access-Token', accessToken),
      });

      return next.handle(authReq);
    }
    return next.handle(req);
  }

  private getAccessToken() {
    return Cookies.get('Access-Token');
  }
}
