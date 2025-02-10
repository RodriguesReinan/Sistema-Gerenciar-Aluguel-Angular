import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CadastroProprietarioComponent } from './pages/cadastro-proprietario/cadastro-proprietario.component';
import { DashBoardComponent } from './pages/home/dash-board/dash-board.component';
import { LoginGuard } from './guards/login.guard';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  {path:'', component: DashBoardComponent, pathMatch:'full'},
  {
    path:'cadastrar-proprietario',
    component: CadastroProprietarioComponent,
    pathMatch:'prefix',
    canActivate: [LoginGuard]
  },
  {path: 'login', component: LoginComponent, pathMatch:'prefix'},

  {path: '**', redirectTo:''},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
