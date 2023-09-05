import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteUrls } from './shared/enums/routes';
import { Gamemodes } from './shared/models/Gamemode';
import { ChessPreloadingStrategyService } from './shared/services/chess-preloading-strategy.service';

const routes: Routes = [
   {
      path: '',
      redirectTo: RouteUrls.MENU,
      pathMatch: 'full'
   },
   {
      path: RouteUrls.GAME,
      redirectTo: RouteUrls.GAME + "/" + Gamemodes[0],
      pathMatch: 'full'
   },
   {
      path: RouteUrls.MENU,
      loadChildren: () => import('./pages/menu/menu.module').then(m => m.MenuModule)
   },
   { 
      path: 'game/:mode', 
      loadChildren: () => import('./pages/game/game.module').then(m => m.GameModule) 
   },
   { 
      path: RouteUrls.UNAUTHORIZED, 
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
