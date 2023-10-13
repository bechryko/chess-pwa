import { TestBed } from '@angular/core/testing';

import { FirestoreHandlerService } from './firestore-handler.service';

xdescribe('DatabaseSyncService', () => {
  let service: FirestoreHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
