import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { environment } from '../environments/environment';  // Certifique-se de ter as credenciais no `environment.ts`
import { AuthInterceptorService } from './services/auth.interceptor.service'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HomeModule} from './pages/home/home.module'
import { CadastroProprietarioModule } from './pages/cadastro-proprietario/cadastro-proprietario.module';
import { CadastroCorretorModule } from './pages/cadastro-corretor/cadastro-corretor.module';
import { CadastroImovelModule } from './pages/cadastro-imovel/cadastro-imovel.module';
import { CadastroInquilinoModule } from './pages/cadastro-inquilino/cadastro-inquilino.module'

import {SharedModule} from './shared/shared-module.module';

import { MenuComponent } from './shared/menu/menu.component';


import { LoginModule } from './components/login/login.module';
import { CadastroAluguelComponent } from './pages/cadastro-aluguel/cadastro-aluguel.component';
import { PagamentosComponent } from './pages/pagamentos/pagamentos.component';
import { ContratoPdfViewComponent } from './pages/contrato-pdf-view/contrato-pdf-view.component';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CadastroAluguelComponent,
    PagamentosComponent,
    ContratoPdfViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomeModule,
    CadastroProprietarioModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CadastroCorretorModule,
    CadastroImovelModule,
    CadastroInquilinoModule,
    LoginModule,

    NgSelectModule,

    provideFirebaseApp(() => initializeApp(environment.firebase)), // Inicializa Firebase
    provideMessaging(() => getMessaging()) // Configura o serviço de notificações push
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
