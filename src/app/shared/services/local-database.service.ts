import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subject, filter, merge, scan, take } from 'rxjs';
import { selectLocalDatabase } from 'src/app/store/selectors/core.selectors';
import { LeaderboardElement } from '../models/LeaderboardElements';
import { multicast } from '../operators/multicast';
import { DatabaseInfoUtils } from '../utils/database-info.utils';
import { ErrorService } from './error.service';

@Injectable({
   providedIn: 'root'
})
export class LocalDatabaseService {
   public storedItems$: Observable<LeaderboardElement[]>;
   private loadItems$: Subject<LeaderboardElement>;
   private storeItems$: Subject<LeaderboardElement>;

   private database?: IDBDatabase;
   private loadingQueue: LeaderboardElement[] = [];

   constructor(
      private swUpdate: SwUpdate,
      private errService: ErrorService,
      private store: Store
   ) {
      this.swUpdate.checkForUpdate().then(isUpdate => {
         if(isUpdate) {
            alert("New version of the app is available. Click OK to reload the app.");
            window.location.reload();
         }
      });

      this.store.select(selectLocalDatabase).pipe(
         filter(value => !!value),
         take(1)
      ).subscribe(value => {
         this.database = value!;
         this.addItems(...this.loadingQueue);
         this.loadItems();
      });

      this.storeItems$ = new Subject<LeaderboardElement>();
      this.loadItems$ = new Subject<LeaderboardElement>();
      this.storedItems$ = merge(this.loadItems$, this.storeItems$).pipe(
         scan((acc, curr) => ([...acc, curr]), [] as LeaderboardElement[]),
         multicast({
            connector: () => new BehaviorSubject<LeaderboardElement[]>([]),
            resetOnRefCountZero: false
         })
      );
   }

   public addItems(...newItems: LeaderboardElement[]): void {
      if(!this.database) {
         this.loadingQueue.push(...newItems);
         return;
      }
      const objectStore = this.database.transaction(DatabaseInfoUtils.LOCAL_OBJECT_STORE_NAME, 'readwrite').objectStore(DatabaseInfoUtils.LOCAL_OBJECT_STORE_NAME);
      newItems.forEach(item => {
         const request = objectStore.add(item);
         request.onerror = (event: any) => {
            console.error('Error adding item: ', event.target.error);
            this.errService.popupError("Error while saving to local database!");
         };
         request.onsuccess = () => this.storeItems$.next(item);
      });
   }

   private loadItems(): void {
      if(!this.database) {
         throw new Error("Local database not initialized!");
      }
      const objectStore = this.database.transaction(DatabaseInfoUtils.LOCAL_OBJECT_STORE_NAME).objectStore(DatabaseInfoUtils.LOCAL_OBJECT_STORE_NAME);
      objectStore.openCursor().onsuccess = (event: any) => {
         const cursor = event.target.result;
         if(cursor) {
            this.loadItems$.next(cursor.value);
            cursor.continue();
         } else {
            this.loadItems$.complete();
         }
      };
   }
}
