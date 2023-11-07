import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGame } from '@chess-guards';
import { GameComponent } from './game.component';

const routes: Routes = [
   { 
      path: '', 
      component: GameComponent,
      canDeactivate: [ CanDeactivateGame ]
   }];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class GameRoutingModule { }
