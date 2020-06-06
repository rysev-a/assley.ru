import * as Cookies from 'js-cookie';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = this.getAccessToken();

    const authReq = req.clone({
      headers: req.headers.set('Access-Token', accessToken),
    });

    return next.handle(authReq);
  }

  private getAccessToken() {
    return Cookies.get('Access-Token');
  }
}
