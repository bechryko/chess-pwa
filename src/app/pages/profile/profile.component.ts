import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { AuthUser, AuthUserWithoutName } from '@chess-models';
import { AuthService } from '@chess-services';
import { Observable } from 'rxjs';

@Component({
   selector: 'app-profile',
   templateUrl: './profile.component.html',
   styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

   public isLoading$: Observable<boolean>;

   constructor(
      private location: Location,
      private authService: AuthService
   ) {
      this.isLoading$ = this.authService.isLoading$;
   }

   public loginSubmit(userData: AuthUserWithoutName): void {
      this.authService.login(userData);
   }

   public registerSubmit(userData: AuthUser): void {
      this.authService.register(userData);
   }

   public goBack(): void {
      this.location.back();
   }
}
