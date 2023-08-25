import { TestBed } from '@angular/core/testing';

import { DatabaseSyncService } from './database-sync.service';

describe('DatabaseSyncService', () => {
  let service: DatabaseSyncService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseSyncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
