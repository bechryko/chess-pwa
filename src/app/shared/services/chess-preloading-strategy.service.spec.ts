import { TestBed } from '@angular/core/testing';

import { ChessPreloadingStrategyService } from './chess-preloading-strategy.service';

xdescribe('ChessPreloadingStrategyService', () => {
   let service: ChessPreloadingStrategyService;

   beforeEach(() => {
      TestBed.configureTestingModule({});
      service = TestBed.inject(ChessPreloadingStrategyService);
   });

   it('should be created', () => {
      expect(service).toBeTruthy();
   });
});
