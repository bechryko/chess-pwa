import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SwUpdate } from '@angular/service-worker';
import { TranslocoService } from '@ngneat/transloco';
import { LeaderboardElementWithId } from '../models/LeaderboardElements';
import { DatabaseProxyService } from './database-proxy.service';
import { FirestoreHandlerService } from './firestore-handler.service';
import { IdbService } from './idb.service';

describe('DatabaseProxyService', () => {
   let service: DatabaseProxyService;
   let swUpdateSpy: jasmine.SpyObj<SwUpdate>;
   let translateServiceSpy: jasmine.SpyObj<TranslocoService>;
   let firestoreHandlerServiceSpy: jasmine.SpyObj<FirestoreHandlerService>;
   let idbServiceSpy: jasmine.SpyObj<IdbService>;
   const newItem: LeaderboardElementWithId = {
      gamemode: 'pvp',
      name: 'test',
      score: 100,
      id: 0
   };
   const newItems = [newItem, { ...newItem, id: 10 }];

   beforeEach(() => {
      TestBed.configureTestingModule({
         providers: [
            DatabaseProxyService,
            {
               provide: SwUpdate,
               useValue: jasmine.createSpyObj('SwUpdate', ['checkForUpdate'])
            },
            {
               provide: TranslocoService,
               useValue: jasmine.createSpyObj('TranslateService', ['instant'])
            },
            {
               provide: FirestoreHandlerService,
               useValue: jasmine.createSpyObj('FirestoreHandlerService', ['storeLeaderboardElement', 'getLeaderboardElements'])
            },
            {
               provide: IdbService,
               useValue: jasmine.createSpyObj('IdbService', ['storeItem', 'readItems', 'setItems'])
            }
         ]
      });
      swUpdateSpy = TestBed.inject(SwUpdate) as jasmine.SpyObj<SwUpdate>;
      swUpdateSpy.checkForUpdate.and.resolveTo(false);
      translateServiceSpy = TestBed.inject(TranslocoService) as jasmine.SpyObj<TranslocoService>;
      firestoreHandlerServiceSpy = TestBed.inject(FirestoreHandlerService) as jasmine.SpyObj<FirestoreHandlerService>;
      firestoreHandlerServiceSpy.storeLeaderboardElement.and.resolveTo(void null);
      idbServiceSpy = TestBed.inject(IdbService) as jasmine.SpyObj<IdbService>;
      idbServiceSpy.storeItem.and.resolveTo(newItem.id);
      service = TestBed.inject(DatabaseProxyService);
   });

   it('should be created', () => {
      expect(service).toBeTruthy();
   });

   it('should check for Service Worker updates', () => {
      expect(swUpdateSpy.checkForUpdate).toHaveBeenCalled();
   });

   it('can add item in online mode', fakeAsync(() => {
      spyOnProperty(window.navigator, 'onLine').and.returnValue(true);
      service.addItem(newItem);
      tick();
      expect(idbServiceSpy.storeItem).withContext("stored item to IDB").toHaveBeenCalledWith(newItem);
      expect(firestoreHandlerServiceSpy.storeLeaderboardElement).withContext("stored item to FireStore").toHaveBeenCalledWith(newItem);
   }));

   it('can add item in offline mode (simple case)', fakeAsync(() => {
      spyOnProperty(window.navigator, 'onLine').and.returnValue(false);
      service.addItem(newItem);
      tick();
      expect(idbServiceSpy.storeItem).withContext("stored item to IDB").toHaveBeenCalledWith(newItem);
      expect(firestoreHandlerServiceSpy.storeLeaderboardElement).withContext("didn't store item to FireStore").not.toHaveBeenCalled();
      expect(service['offlineQueue']).withContext("item added to offline queue").toContain(newItem);
   }));

   it('can add item in offline mode (coming online afterwards)', fakeAsync(() => {
      spyOnProperty(navigator, 'onLine').and.returnValue(false);
      service.addItem(newItem);
      tick();
      expect(idbServiceSpy.storeItem).withContext("stored item to IDB").toHaveBeenCalledWith(newItem);
      expect(firestoreHandlerServiceSpy.storeLeaderboardElement).withContext("didn't store item to FireStore").not.toHaveBeenCalled();
      expect(service['offlineQueue']).withContext("item added to offline queue").toContain(newItem);
      const addItemSpy = spyOn(service, 'addItem');
      dispatchEvent(new Event('online'));
      expect(addItemSpy).withContext("online event called addItem").toHaveBeenCalledWith(newItem);
      expect(service['offlineQueue'].length).withContext("emptied offline queue").toBe(0);
   }));

   it('gets elements when online', fakeAsync(async () => {
      spyOnProperty(window.navigator, 'onLine').and.returnValue(true);
      firestoreHandlerServiceSpy.getLeaderboardElements.and.resolveTo(newItems);
      let elements: LeaderboardElementWithId[] = [];
      service.getAllElements(false).then(els => elements = els);
      tick();
      expect(idbServiceSpy.setItems).withContext("set items in IDB").toHaveBeenCalledWith(newItems);
      expect(elements).withContext("returned correct values").toBe(newItems);
   }));

   it('gets elements on startup', fakeAsync(() => {
      spyOnProperty(window.navigator, 'onLine').and.returnValue(false);
      idbServiceSpy.readItems.and.resolveTo(newItems);
      spyOn(service as any, 'getLastOnlineTimestamp').and.returnValue(newItems[1].id - 1);
      let elements: LeaderboardElementWithId[] = [];
      service.getAllElements(true).then(els => elements = els);
      tick();
      expect(elements).withContext("returned correct values").toBe(newItems);
      expect(firestoreHandlerServiceSpy.storeLeaderboardElement).withContext("stored offline queued elements to FireStore").toHaveBeenCalledWith(newItems[1]);
      expect(firestoreHandlerServiceSpy.storeLeaderboardElement).withContext("stored only offline queued elements to FireStore").toHaveBeenCalledTimes(1);
   }));
});
