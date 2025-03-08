import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CadastroProprietarioComponent } from './pages/cadastro-proprietario/cadastro-proprietario.component';
import {CadastroCorretorComponent} from './pages/cadastro-corretor/cadastro-corretor.component';

import { DashBoardComponent } from './pages/home/dash-board/dash-board.component';
import { LoginGuard } from './guards/login.guard';
import { LoginComponent } from './components/login/login.component';
import { CadastroImovelComponent } from './pages/cadastro-imovel/cadastro-imovel.component';
import { CadastroInquilinoComponent } from './pages/cadastro-inquilino/cadastro-inquilino.component';


const routes: Routes = [
  {path:'', component: DashBoardComponent, pathMatch:'full'},
  {
    path:'cadastrar-proprietario',
    component: CadastroProprietarioComponent,
    pathMatch:'prefix',
    canActivate: [LoginGuard]
  },
  {path: 'login', component: LoginComponent, pathMatch:'prefix'},

  {path: 'cadastrar-corretor', component: CadastroCorretorComponent, pathMatch: 'prefix'},

  {path: 'cadastrar-imovel', component:CadastroImovelComponent, pathMatch:'prefix'},

  {path: 'cadastrar-inquilino', component:CadastroInquilinoComponent, pathMatch:'prefix'},

  {path: '**', redirectTo:''},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
