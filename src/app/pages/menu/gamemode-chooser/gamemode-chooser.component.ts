import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '@chess-services';
import { Observable, map } from 'rxjs';

@Component({
   selector: 'chess-gamemode-chooser',
   templateUrl: './gamemode-chooser.component.html',
   styleUrls: ['./gamemode-chooser.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamemodeChooserComponent {
   public loggedOut$: Observable<boolean>;
   
   constructor(
      private authService: AuthService
   ) {
      this.loggedOut$ = this.authService.isUserLoggedIn$.pipe(
         map(value => !value)
      );
   }
}
