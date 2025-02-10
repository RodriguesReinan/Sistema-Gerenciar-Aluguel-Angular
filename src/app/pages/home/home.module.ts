import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashBoardComponent } from './dash-board/dash-board.component';



@NgModule({
  declarations: [
    DashBoardComponent
  ],
  exports:[
    DashBoardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
