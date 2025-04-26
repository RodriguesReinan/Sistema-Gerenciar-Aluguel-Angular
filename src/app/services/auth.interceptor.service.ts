import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{
  constructor(private loginLogoutService: LoginService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

      const request = token ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      }) : req;

      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401 && token) {
            this.loginLogoutService.Dologout(); // limpa o token para fazer o logout
            this.router.navigate(['/login']);  // redireciona para o login
          }
          return throwError(() => error);
        })
      );
  }
}
