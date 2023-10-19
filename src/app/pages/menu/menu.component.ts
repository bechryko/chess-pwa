import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '@chess-services';
import { Observable } from 'rxjs';

@Component({
   selector: 'app-menu',
   templateUrl: './menu.component.html',
   styleUrls: ['./menu.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {
   public isUserLoggedIn$: Observable<boolean>;
   public isUserLoading$: Observable<boolean>;

   constructor(
      private authService: AuthService
   ) {
      this.isUserLoading$ = this.authService.isLoading$;
      this.isUserLoggedIn$ = this.authService.isUserLoggedIn$;
   }

   public logout() {
      this.authService.logout();
   }
}
