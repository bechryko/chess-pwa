import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Gamemode } from 'src/app/shared/models/Gamemode';
import { GamemodeService } from 'src/app/shared/services/gamemode.service';

@Component({
   selector: 'app-gamemode-chooser',
   templateUrl: './gamemode-chooser.component.html',
   styleUrls: ['./gamemode-chooser.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamemodeChooserComponent {

   constructor(
      private router: Router,
      private gamemodeService: GamemodeService
   ) { }

   startGame(mode: Gamemode) {
      this.gamemodeService.selectGamemode(mode);
      this.router.navigateByUrl("/game");
   }
}
