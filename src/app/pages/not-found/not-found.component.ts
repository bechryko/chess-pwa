import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouteUrls } from 'src/app/shared/enums/routes';

@Component({
   selector: 'app-not-found',
   templateUrl: './not-found.component.html',
   styleUrls: ['./not-found.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   standalone: true
})
export class NotFoundComponent {

   constructor(
      private router: Router
   ) { }

   public toMenu() {
      this.router.navigateByUrl(RouteUrls.MENU);
   }
}
