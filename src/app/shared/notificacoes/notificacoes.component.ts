import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/services/login.service';
import {environment} from 'src/environments/environment';


interface Notificacao {
  pk_id: number;
  id: string;
  titulo: string;
  mensagem: string;
  data_envio: string;
  status: string;
}


@Component({
  selector: 'app-notificacoes',
  templateUrl: './notificacoes.component.html',
  styleUrls: ['./notificacoes.component.css']
})
export class NotificacoesComponent implements OnInit {
  notificacoes: Notificacao[] = [];
  dropdownAberto = false;

  private apiUrl_base = `${environment.apiUrl}`;


  constructor(private http: HttpClient, private loginService: LoginService) { }

  ngOnInit(): void {
    this.carregarNotificacoes();
  }

  get notificacoesNaoVisualizadas(){
    return this.notificacoes.filter(n => n.status === 'enviado-nao-visualizado');
  }

  toggleDropdown(){
    this.dropdownAberto = !this.dropdownAberto;
  }

  carregarNotificacoes(){

    this.loginService.get_user_id().subscribe({
      next: (userData) => {
        //console.log('user data notificacao: ', userData)
        const usuarioId = userData?.id;
        //console.log('usuario id notificacoes', usuarioId);
        if (!usuarioId){
          //console.log('Usuário não autenticado.');
          return;
        }

        // este bloco estava fora e era apenas ele
        this.http.get<Notificacao[]>(`${this.apiUrl_base}/notificacao/notificacoes/novas?usuario_id=${usuarioId}`).subscribe({
          next: (data) => {
            this.notificacoes = data;
          },
          error: (erro) => {
            console.log('erro ao carregar as notificações', erro)
          },
          complete: () => {}
        });
      },
      error: (err) => {
        console.log('Erro ao obter ID do usuário');
      }
    });

  }

  marcarComoVisualizada(id: string) {
    this.loginService.get_user_id().subscribe({
      next: (userData) => {
        const usuarioId = userData?.id;
        if (!usuarioId) {
          console.error('Usuário não autenticado.');
          return;
        }

        this.http.patch(`${this.apiUrl_base}/notificacao/notificacoes/${id}/visualizar?usuario_id=${usuarioId}`, {}).subscribe(() => {
          const notif = this.notificacoes.find(n => n.id === id);
          if (notif) notif.status = 'enviado-visualizado';
        });
      },
      error: (err) => {
        console.log('Erro ao obter ID do usuário', err);
      }
    });
  }

}
