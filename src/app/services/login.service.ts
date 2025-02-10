import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  Dologin(){
    localStorage.setItem('token', 'fkdjdkfjdkjfdk58')
  }

  Dologout(){
    localStorage.clear()
  }
}
