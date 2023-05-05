import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu.component';

const routes: Routes = [
  { 
    path: '', 
    component: MenuComponent 
  }, 
  { 
    path: 'gamemode-chooser', 
    loadChildren: () => import('./gamemode-chooser/gamemode-chooser.module').then(m => m.GamemodeChooserModule) 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
