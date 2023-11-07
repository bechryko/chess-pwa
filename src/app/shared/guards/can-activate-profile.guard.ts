import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { Route } from '../enums/Route';
import { AuthService } from '../services/auth.service';

export const CanActivateProfile: CanActivateFn = () => {
   const authService = inject(AuthService);
   const router = inject(Router);
   return authService.isUserLoggedIn$.pipe(
      map(isLoggedIn => {
         if (isLoggedIn) {
            router.navigateByUrl(Route.UNAUTHORIZED);
         }
         return !isLoggedIn;
      })
   );
}
