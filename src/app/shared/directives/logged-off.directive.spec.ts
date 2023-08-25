import { ElementRef, } from '@angular/core';
import { inject } from '@angular/core/testing';
import { LoggedOffDirective } from './logged-off.directive';

describe('LoggedOffDirective', () => {
   it('should create an instance', inject([], (elementRef: ElementRef) => {
      const directive = new LoggedOffDirective(elementRef);
      expect(directive).toBeTruthy();
   }));
});
