import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service'

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private service: LoginService, private router: Router){}

  // canActivate(
    // route: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // const hasToken = !!localStorage.getItem('token')
    // if (!hasToken) {
      // Redireciona para a página de login e retorna false
      // return this.router.createUrlTree(['/login']);
    // }
    // return true;
  // }

  canActivate(): boolean {
    if (this.service.isLoggedIn()){
      return true;
    }
    this.router.navigate(['/login']);
    return false
  }

}
