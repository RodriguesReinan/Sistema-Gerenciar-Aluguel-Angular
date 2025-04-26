import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CadastroProprietarioComponent } from './pages/cadastro-proprietario/cadastro-proprietario.component';
import {CadastroCorretorComponent} from './pages/cadastro-corretor/cadastro-corretor.component';

import { DashBoardComponent } from './pages/home/dash-board/dash-board.component';
import { LoginGuard } from './guards/login.guard';
import { LoginComponent } from './components/login/login.component';
import { CadastroImovelComponent } from './pages/cadastro-imovel/cadastro-imovel.component';
import { CadastroInquilinoComponent } from './pages/cadastro-inquilino/cadastro-inquilino.component';
import { SharedConsultaPessoasComponent } from 'src/app/shared/shared-consulta-pessoas/shared-consulta-pessoas.component'
import { CadastroAluguelComponent } from './pages/cadastro-aluguel/cadastro-aluguel.component';
import { PagamentosComponent } from './pages/pagamentos/pagamentos.component';
import { ContratoPdfViewComponent } from './pages/contrato-pdf-view/contrato-pdf-view.component';


const routes: Routes = [

  {path: 'login', component: LoginComponent, pathMatch:'prefix'},

  {path:'', component: DashBoardComponent, pathMatch:'full', canActivate: [LoginGuard]},
  {
    path:'cadastrar-proprietario',
    component: CadastroProprietarioComponent,
    pathMatch:'prefix',
    canActivate: [LoginGuard]
  },

  {path: 'cadastrar-corretor', component: CadastroCorretorComponent, pathMatch: 'prefix', canActivate: [LoginGuard]},

  {path: 'cadastrar-imovel', component:CadastroImovelComponent, pathMatch:'prefix', canActivate: [LoginGuard]},

  {path: 'cadastrar-inquilino', component:CadastroInquilinoComponent, pathMatch:'prefix', canActivate: [LoginGuard]},

  {path: 'consultas', component: SharedConsultaPessoasComponent, pathMatch: 'prefix', canActivate: [LoginGuard]},

  {path: 'cadastrar-aluguel', component: CadastroAluguelComponent, pathMatch: 'prefix', canActivate: [LoginGuard]},

  //{path: 'consultar-pagamentos', component: PagamentosComponent, pathMatch: 'prefix'},
  {path: 'contrato-pdf/:id', component: ContratoPdfViewComponent, canActivate: [LoginGuard]},

  { path: 'consultar-pagamentos/:id', component: PagamentosComponent, canActivate: [LoginGuard]},

  {path: '**', redirectTo:'/login'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
