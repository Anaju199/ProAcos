import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TokenService } from '../../services/token.service';
import { CSRFTokenService } from '../../services/csrftoken.service';

@Injectable()
export class AutenticacaoInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
    private csfrTokenService: CSRFTokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isApiRequest = request.url.includes('/api/');
    const isLoginRequest = request.url.includes('/login/');

    if (isLoginRequest && this.tokenService.possuiToken()) {
      const token = this.tokenService.retornarToken();
      const headers = new HttpHeaders({
        'accept': 'application/json',
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      const clonedRequest = request.clone({ headers });
      console.log('Login request details:', clonedRequest);
      return next.handle(clonedRequest);
    }

    if (isApiRequest) {
      return from(this.csfrTokenService.getCSRFToken()).pipe(
        switchMap(() => {
          const csrfToken = this.csfrTokenService.getCSRFTokenFromCookies();
          const token = this.tokenService.retornarTokenApi();
          const headers = new HttpHeaders({
            'X-CSRFToken': csrfToken || '',
            'Authorization': `Bearer ${token}`,
            'accept': 'application/json',
            'content-type': 'application/json'
          });
          const clonedRequest = request.clone({ headers, withCredentials: true });
          console.log('API request details:', clonedRequest);
          return next.handle(clonedRequest);
        })
      );
    }

    console.log('Non-API request details:', request);
    return next.handle(request);
  }
}
