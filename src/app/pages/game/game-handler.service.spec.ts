import { TestBed } from '@angular/core/testing';

import { GameHandlerService } from './game-handler.service';

xdescribe('GameHandlerService', () => {
   let service: GameHandlerService;

   beforeEach(() => {
      TestBed.configureTestingModule({});
      service = TestBed.inject(GameHandlerService);
   });

   it('should be created', () => {
      expect(service).toBeTruthy();
   });
});
