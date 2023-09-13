import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
   selector: 'app-gamemode-chooser',
   templateUrl: './gamemode-chooser.component.html',
   styleUrls: ['./gamemode-chooser.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamemodeChooserComponent {
   public loggedOut$: Observable<boolean>;
   
   constructor(
      authService: AuthService
   ) {
      this.loggedOut$ = authService.isUserLoggedIn$.pipe(
         map(value => !value)
      );
   }
}
