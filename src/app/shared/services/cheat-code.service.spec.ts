import { TestBed } from '@angular/core/testing';

import { CheatCodeService } from './cheat-code.service';

describe('CheatCodeService', () => {
   let service: CheatCodeService;

   beforeEach(() => {
      TestBed.configureTestingModule({});
      service = TestBed.inject(CheatCodeService);
   });

   it('should be created', () => {
      expect(service).toBeTruthy();
   });
});
