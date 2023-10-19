import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Route } from './shared/enums/Route';
import { Gamemodes } from './shared/models/Gamemode';
import { ChessPreloadingStrategyService } from './shared/services/chess-preloading-strategy.service';

const routes: Routes = [
   {
      path: '',
      redirectTo: Route.MENU,
      pathMatch: 'full'
   },
   {
      path: Route.GAME,
      redirectTo: Route.GAME + "/" + Gamemodes[0],
      pathMatch: 'full'
   },
   {
      path: Route.MENU,
      loadChildren: () => import('./pages/menu/menu.module').then(m => m.MenuModule)
   },
   { 
      path: Route.SETTINGS, 
      loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsModule) 
   },
   { 
      path: 'game/:mode', 
      loadChildren: () => import('./pages/game/game.module').then(m => m.GameModule) 
   },
   { 
      path: Route.UNAUTHORIZED, 
      loadComponent: () => import('./pages/unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent) 
   },
   {
      path: '**',
      loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
   }
];

@NgModule({
   imports: [RouterModule.forRoot(routes, {
      preloadingStrategy: ChessPreloadingStrategyService
   })],
   exports: [RouterModule]
})
export class AppRoutingModule { }
