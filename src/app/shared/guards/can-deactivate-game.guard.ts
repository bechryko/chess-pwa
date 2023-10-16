import { CanDeactivateFn } from '@angular/router';
import { GameComponent } from 'src/app/pages/game/game.component';

export const CanDeactivateGame: CanDeactivateFn<GameComponent> = (
   component: GameComponent
) => component.canDeactivate() || window.confirm(component.transloco.translate("game.exitNotice"));
