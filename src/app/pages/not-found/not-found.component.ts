import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Route } from '@chess-enums';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
   selector: 'app-not-found',
   templateUrl: './not-found.component.html',
   styleUrls: ['./not-found.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   standalone: true,
   imports: [
      TranslocoModule
   ]
})
export class NotFoundComponent {

   constructor(
      private router: Router
   ) { }

   public toMenu() {
      this.router.navigateByUrl(Route.MENU);
   }
}
