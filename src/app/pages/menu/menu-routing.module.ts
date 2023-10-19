import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteUrls } from '@chess-enums';
import { CanActivateProfile } from '@chess-guards';
import { MenuComponent } from './menu.component';

const routes: Routes = [
   {
      path: '',
      component: MenuComponent
   },
   {
      path: RouteUrls.GAMEMODE_CHOOSER.split('/')[1],
      loadChildren: () => import('./gamemode-chooser/gamemode-chooser.module').then(m => m.GamemodeChooserModule)
   },
   { 
      path: RouteUrls.LEADERBOARDS.split('/')[1], 
      loadChildren: () => import('../../pages/leaderboards/leaderboards.module').then(m => m.LeaderboardsModule),
      data: {
         preload: true
      }
   },
   { 
      path: RouteUrls.PROFILE.split('/')[1], 
      loadChildren: () => import('../../pages/profile/profile.module').then(m => m.ProfileModule),
      canLoad: [ CanActivateProfile ]
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class MenuRoutingModule { }
