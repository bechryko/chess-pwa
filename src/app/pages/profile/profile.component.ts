import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthUser, AuthUserWithoutName } from 'src/app/shared/models/authUsers';
import { AuthService } from 'src/app/shared/services/auth.service';

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
