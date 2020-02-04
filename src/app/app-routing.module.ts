import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalcComponent } from './components/calc/calc.component';
import { TicTacToeComponent } from './components/tic-tac-toe/tic-tac-toe.component';
const routes: Routes = [
  {
    path: 'calculator',
    component: CalcComponent
  },
  {
    path: 'tic-tac-toe',
    component: TicTacToeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }