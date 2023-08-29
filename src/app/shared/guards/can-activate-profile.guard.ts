import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const CanActivateProfile: CanActivateFn = () => {
   const authService = inject(AuthService);
   const router = inject(Router);
   return authService.isUserLoggedIn().pipe(map(user => {
      const access = user === null;
      if(!access) {
         router.navigateByUrl('/access-denied');
      }
      return access;
   }));
}
