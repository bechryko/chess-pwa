import { ElementRef, } from '@angular/core';
import { inject } from '@angular/core/testing';
import { AuthService } from '../services/auth.service';
import { LoggedOffDirective } from './logged-off.directive';

describe('LoggedOffDirective', () => {
   it('should create an instance', inject([], (elementRef: ElementRef, authService: AuthService) => {
      const directive = new LoggedOffDirective(elementRef, authService);
      expect(directive).toBeTruthy();
   }));
});
