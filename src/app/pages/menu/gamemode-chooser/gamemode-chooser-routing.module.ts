import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamemodeChooserComponent } from './gamemode-chooser.component';

const routes: Routes = [{ path: '', component: GamemodeChooserComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamemodeChooserRoutingModule { }
