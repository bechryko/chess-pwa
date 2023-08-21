import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
   selector: 'app-gamemode-chooser',
   templateUrl: './gamemode-chooser.component.html',
   styleUrls: ['./gamemode-chooser.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamemodeChooserComponent {

   constructor(private router: Router) { }

   startPvP() {
      localStorage.setItem("chessPWA-gamemode", "pvp");
      this.router.navigateByUrl('/game');
   }

   startPvE() {
      localStorage.setItem("chessPWA-gamemode", "pve");
      this.router.navigateByUrl('/game');
   }
}
