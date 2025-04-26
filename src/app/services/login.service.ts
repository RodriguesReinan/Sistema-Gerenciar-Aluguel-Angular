import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject  } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8000/auth/login'; // Substitua pela URL da sua API
  private apiUrl_base = 'http://localhost:8000'
  private isAuthenticated = false;

  // Aqui criamos o BehaviorSubject com o valor inicial baseado no token
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.loggedIn.asObservable(); // Observable que será usado no app.component

  constructor(private http: HttpClient) { }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  Dologin(username: string, password: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);

    return this.http.post<any>(this.apiUrl, body.toString(), {
      headers: { 'content-type': 'application/x-www-form-urlencoded' }
    }).pipe(
      tap(response => {
        if (response.access_token) {
          localStorage.setItem('token', response.access_token);
          this.loggedIn.next(true); // notifica que está logado
        }
      })
    );
  }

  Dologout(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false); // notifica que deslogou
  }

  get_user_id(): Observable<any>{
    return this.http.get<any>(`http://localhost:8000/auth/dados/me`);
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }

  // Dologin(username: string, password: string): Observable<any>{
  //   const body = new URLSearchParams();
  //   body.set('username', username);
  //   body.set('password', password);

  //   return this.http.post<any>(this.apiUrl, body.toString(),{
  //     headers: {'content-type': 'application/x-www-form-urlencoded'}
  //   }).pipe(
  //     tap(response => {
  //       if (response.access_token) {
  //         this.isAuthenticated = true;
  //         localStorage.setItem('token', response.access_token);
  //       }
  //     })
  //   );
  // }



  // isLoggedIn(): boolean {
  //   const token = localStorage.getItem('token');
  //   console.log('Token atual:', token);
  //   return !!token;  // Retorna "true" se existir um token salvo
  // }

  // Dologout(){
  //   localStorage.removeItem('token');
  // }

}
