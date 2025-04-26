import { Component } from '@angular/core';
import { PushNotificationsService } from 'src/app/services/push-notifications.service';
import { LoginService } from 'src/app/services/login.service';
import { Observable, filter  } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sistema-aluguel';
  isLoggedIn$: Observable<boolean>;
  showLogoutButton = false;

  constructor(
    private pushNotification: PushNotificationsService,
    public loginService: LoginService,
    private router: Router
  ){
    this.isLoggedIn$ = this.loginService.isLoggedIn$;

    // Atualiza a visibilidade do botão sempre que a rota mudar
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showLogoutButton = !event.url.includes('/login');
      }
    });
  }

  ngOnInit(){
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/firebase-messaging-sw.js')
        .then(registration => {
          console.log('Service Worker registrado com sucesso:', registration);
        })
        .catch(error => {
          console.log('Erro ao registrar o Service Worker:', error);
        });
    }
    this.pushNotification.requestPermission();
    this.pushNotification.receiveMessage();
  }

  logout() {
    this.loginService.Dologout();
    this.router.navigate(['/login']); // redireciona para a tela de login
  }
}
