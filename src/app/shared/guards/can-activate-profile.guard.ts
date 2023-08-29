import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const CanActivateProfile: CanActivateFn = () => {
   const authService = inject(AuthService);
   return authService.isUserLoggedIn().pipe(map(user => {
      return user === null;
   }));
}
