import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   {
      path: '',
      redirectTo: '/menu',
      pathMatch: 'full'
   },
   {
      path: 'game',
      redirectTo: '/game/pvp',
      pathMatch: 'full'
   },
   {
      path: 'menu',
      loadChildren: () => import('./pages/menu/menu.module').then(m => m.MenuModule)
   },
   { path: 'game/:mode', loadChildren: () => import('./pages/game/game.module').then(m => m.GameModule) },
   { path: 'access-denied', loadComponent: () => import('./pages/unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent) },
   {
      path: '**',
      loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
   }
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule { }
