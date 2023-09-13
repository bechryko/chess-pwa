import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { BehaviorSubject, Observable, Subject, merge, scan, share } from 'rxjs';
import { LeaderboardElement } from '../models/LeaderboardElements';

@Injectable({
   providedIn: 'root'
})
export class LocalDatabaseService {
   private static readonly OBJECT_STORE_NAME = 'chessPWA';
   private static readonly OBJECT_STORE_VERSION = 1;

   public storedItems$: Observable<LeaderboardElement[]>;
   private loadItems$: Subject<LeaderboardElement>;
   private storeItems$: Subject<LeaderboardElement>;

   private database?: IDBDatabase;
   private loadingQueue: LeaderboardElement[] = [];

   constructor(
      private swUpdate: SwUpdate
   ) {
      this.swUpdate.checkForUpdate().then(isUpdate => {
         if(isUpdate) {
            alert("New version of the app is available. Click OK to reload the app.");
            window.location.reload();
         }
      });

      this.storeItems$ = new Subject<LeaderboardElement>();
      this.loadItems$ = new Subject<LeaderboardElement>();
      this.storedItems$ = merge(this.loadItems$, this.storeItems$).pipe(
         scan((acc, curr) => ([...acc, curr]), [] as LeaderboardElement[]),
         share({
            connector: () => new BehaviorSubject<LeaderboardElement[]>([]),
            resetOnRefCountZero: false,
            resetOnComplete: false,
            resetOnError: false
         })
      );
   }

   public addItems(...newItems: LeaderboardElement[]): void {
      if(!this.database) {
         this.loadingQueue.push(...newItems);
         return;
      }
      const objectStore = this.database.transaction(LocalDatabaseService.OBJECT_STORE_NAME, 'readwrite').objectStore(LocalDatabaseService.OBJECT_STORE_NAME);
      newItems.forEach(item => {
         const request = objectStore.add(item);
         request.onerror = (event: any) => {
            console.error('Error adding item: ', event.target.error);
         };
         request.onsuccess = () => this.storeItems$.next(item);
      });
   }

   public openDatabase(): void {
      const request = indexedDB.open(LocalDatabaseService.OBJECT_STORE_NAME + '-db', LocalDatabaseService.OBJECT_STORE_VERSION);
      request.onerror = (event: any) => {
         this.loadItems$.error(event.target.error);
      };
      request.onupgradeneeded = (event: any) => {
         this.createObjectStore(event.target.result as IDBDatabase);
      };
      request.onsuccess = (event: any) => {
         this.database = event.target.result as IDBDatabase;
         this.addItems(...this.loadingQueue);
         this.loadItems();
      };
   }

   private loadItems(): void {
      if(!this.database) {
         throw new Error("Local database not initialized!");
      }
      const objectStore = this.database.transaction(LocalDatabaseService.OBJECT_STORE_NAME).objectStore(LocalDatabaseService.OBJECT_STORE_NAME);
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

   private createObjectStore(database: IDBDatabase): void {
      const objectStore = database.createObjectStore(LocalDatabaseService.OBJECT_STORE_NAME, {
         keyPath: 'id',
         autoIncrement: true,
      });
      objectStore.createIndex('gamemode', 'gamemode', { unique: false });
      objectStore.createIndex('name', 'name', { unique: false });
      objectStore.createIndex('score', 'score', { unique: false });
   }
}
