import { CanDeactivateFn } from '@angular/router';
import { GameComponent } from 'src/app/pages/game/game.component';

const popUpText = "Are you sure you want to leave the game?";

export const CanDeactivateGame: CanDeactivateFn<GameComponent> = (
   component: GameComponent
) => component.canDeactivate() || window.confirm(popUpText);
