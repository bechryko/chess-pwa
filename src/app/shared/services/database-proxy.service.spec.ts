import { TestBed } from '@angular/core/testing';

import { DatabaseProxyService } from './database-proxy.service';

describe('DatabaseProxyService', () => {
   let service: DatabaseProxyService;

   beforeEach(() => {
      TestBed.configureTestingModule({});
      service = TestBed.inject(DatabaseProxyService);
   });

   it('should be created', () => {
      expect(service).toBeTruthy();
   });
});