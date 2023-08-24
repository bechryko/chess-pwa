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
   },
   { path: 'leaderboards', loadChildren: () => import('../../pages/leaderboards/leaderboards.module').then(m => m.LeaderboardsModule) },
   { path: 'profile', loadChildren: () => import('../../pages/profile/profile.module').then(m => m.ProfileModule) }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class MenuRoutingModule { }
