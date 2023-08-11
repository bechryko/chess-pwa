import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   {
      path: 'menu',
      loadChildren: () => import('./pages/menu/menu.module').then(m => m.MenuModule)
   },
   {
      path: '',
      redirectTo: '/menu',
      pathMatch: 'full'
   },
   { path: 'profile', loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule) },
   { path: 'game', loadChildren: () => import('./pages/game/game.module').then(m => m.GameModule) },
   { path: 'leaderboards', loadChildren: () => import('./pages/leaderboards/leaderboards.module').then(m => m.LeaderboardsModule) },
   {
      path: '**',
      loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)
   }
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule { }
