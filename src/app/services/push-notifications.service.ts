import { Injectable } from '@angular/core';
import { Messaging } from '@angular/fire/messaging';
import { getToken, MessagePayload, onMessage } from 'firebase/messaging';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'
import { LoginService } from '../services/login.service'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationsService {
  private messageSource = new BehaviorSubject<MessagePayload | null>(null);
  currentMessage = this.messageSource.asObservable();

  constructor(
    private messaging: Messaging,
    private http: HttpClient,
    private loginService: LoginService
  ) { }

  dados_usuario_logado(){
    // obtendo o id do usuário
    this.loginService.get_user_id().subscribe({
      next: (userData) => {
        console.log('dados gerais: ', userData);
        const userEmail = userData?.email;
        const userId = userData?.id;

        if (userId){
          console.log('id do usuário: ', userId);
        } else {
          console.error('Usuário não autenticado.');
        }

        if (userEmail){
          console.log('email do usuario: ', userEmail)
        } else {
          console.error('Usuário não autenticado.');
        }
      },
      error: (err) => {
        console.log('Erro ao obter email do usuário', err);
      }
    });
  }

  requestPermission(){
    Notification.requestPermission().then(permission => {
      if(permission === 'granted'){
        return getToken(this.messaging, { vapidKey: 'BF-mTh5RJU7X9oypBVpXHvpzzQsqZFZy5xemW3eHW6Bsfw9d18E9PJg0_4ciwpDpIUwHR3c-Gd5qH3GC0dn0BHM' })  // Pega no console do Firebase
      } else {
        console.warn('Usuário negou as notificações ou já bloqueou.');
        return null; // Evita erros ao tentar usar um token inexistente
      }
    }).then((token) => {
      if(token){
        console.log('Token Recebido: ', token);

        // obtendo o id do usuário
        this.loginService.get_user_id().subscribe({
          next: (userData) => {
            console.log('dados gerais: ', userData);
            const userEmail = userData?.email;
            const userId = userData?.id;

            if (userId){
              console.log('id do usuário: ', userId);
              this.sendTokenToServer(token, userId);
            } else {
              console.error('Usuário não autenticado.');
            }

            if (userEmail){
              console.log('email do usuario: ', userEmail)
            } else {
              console.error('Usuário não autenticado.');
            }
          },
          error: (err) => {
            console.log('Erro ao obter email do usuário', err);
          }
        });
      }
    }).catch((error) =>{
    console.log('Erro ao solicitar permissão para notificações:', error);
    });
  }

  private sendTokenToServer(token: string, userId: string){
    const novoToken = {
      dispositivo_token: token,
      usuario: {
        id: userId
      }
    }
    this.http.post(`http://localhost:8000/tokens-dispositivos/register-token`, novoToken).subscribe(
      () => console.log('Token enviado para o servidor com sucesso!'),
      (error) => console.log('Erro ao enviar token: ', error)
    );
  }

  // Ouvir notificações enquanto o app estiver aberto
  receiveMessage() {
    onMessage(this.messaging, (payload) => {
      console.log('Mensagem recebida:', payload);
      this.messageSource.next(payload);
    });
  }

}
