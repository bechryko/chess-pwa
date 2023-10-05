import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, take } from 'rxjs';
import { selectLocalDatabase } from 'src/app/store/selectors/core.selectors';
import { LeaderboardElementWithId } from '../models/LeaderboardElements';
import { DatabaseInfoUtils } from '../utils/database-info.utils';

@Injectable({
   providedIn: 'root'
})
export class IdbService {
   private static readonly DB_NOT_INITIALIZED_MESSAGE = "IndexedDB database not initialized!";

   private database?: IDBDatabase;

   constructor(
      private store: Store
   ) {
      this.store.select(selectLocalDatabase).pipe(
         filter(value => !!value),
         take(1)
      ).subscribe(value => {
         this.database = value!;
      });
   }

   public storeItem(item: LeaderboardElementWithId): Promise<number> {
      return new Promise<number>((resolve, reject) => {
         if (!this.database) {
            reject(IdbService.DB_NOT_INITIALIZED_MESSAGE);
         }
         const objectStore = this.database!.transaction(DatabaseInfoUtils.LOCAL_OBJECT_STORE_NAME, 'readwrite').objectStore(DatabaseInfoUtils.LOCAL_OBJECT_STORE_NAME);
         const request = objectStore.put(item);
         request.onsuccess = (event: any) => resolve(event.target.result);
         request.onerror = (event: any) => reject(event.target.error);
      });
   }

   public readItems(): Promise<LeaderboardElementWithId[]> {
      return new Promise<LeaderboardElementWithId[]>((resolve, reject) => {
         if (!this.database) {
            reject(IdbService.DB_NOT_INITIALIZED_MESSAGE);
         }
         const elements: LeaderboardElementWithId[] = [];
         const objectStore = this.database!.transaction(DatabaseInfoUtils.LOCAL_OBJECT_STORE_NAME).objectStore(DatabaseInfoUtils.LOCAL_OBJECT_STORE_NAME);
         objectStore.openCursor().onsuccess = (event: any) => {
            const cursor = event.target.result;
            if (cursor) {
               elements.push(cursor.value);
               cursor.continue();
            } else {
               resolve(elements);
            }
         };
      });
   }

   public setItems(items: LeaderboardElementWithId[]): void {
      if (!this.database) {
         throw new Error(IdbService.DB_NOT_INITIALIZED_MESSAGE);
      }
      const objectStore = this.database!.transaction(DatabaseInfoUtils.LOCAL_OBJECT_STORE_NAME, 'readwrite').objectStore(DatabaseInfoUtils.LOCAL_OBJECT_STORE_NAME);
      const request = objectStore.clear();
      request.onsuccess = _ => items.forEach(item => objectStore.add(item));
   }
}
