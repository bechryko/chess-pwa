import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Observable } from 'rxjs';
import { LeaderboardElement } from '../models/LeaderboardElements';

@Injectable({
   providedIn: 'root'
})
export class LocalDatabaseService {
   private objectStoreName = 'chessPWA';
   private db?: IDBDatabase;
   public isLoaded: boolean = false;

   constructor(private swUpdate: SwUpdate) {
      this.swUpdate.checkForUpdate().then(data => {
         if (data) {
            alert("New version of the app is available. Click OK to reload the app.");
            window.location.reload();
         }
      })

      const request = indexedDB.open(this.objectStoreName + '-db', 1);

      request.onerror = (event: any) => {
         console.error('Database error: ', event.target.error);
      };

      request.onupgradeneeded = (event: any) => {
         this.db = event.target.result as IDBDatabase;
         this.createObjectStore();
         this.isLoaded = true;
      };

      request.onsuccess = (event: any) => {
         this.db = event.target.result as IDBDatabase;
         this.isLoaded = true;
      };
   }

   public loadItems(): Observable<LeaderboardElement[]> {
      if (!this.db) throw new Error('Database not initialized');
      const objectStore = this.db.transaction(this.objectStoreName).objectStore(this.objectStoreName);

      return new Observable<LeaderboardElement[]>((observer) => {
         const items: LeaderboardElement[] = [];

         objectStore.openCursor().onsuccess = (event: any) => {
            const cursor = event.target.result;
            if (cursor) {
               items.push(cursor.value);
               cursor.continue();
            } else {
               observer.next(items);
            }
         };
      });
   }

   public addItem(newItem: LeaderboardElement): void {
      if (!this.db) throw new Error('Database not initialized');
      const objectStore = this.db.transaction(this.objectStoreName, 'readwrite').objectStore(this.objectStoreName);
      const request = objectStore.add(newItem);

      request.onerror = (event: any) => console.error('Error adding item: ', event.target.error);
   }

   private createObjectStore(): void {
      if (!this.db) throw new Error('Database not initialized');
      const objectStore = this.db.createObjectStore(this.objectStoreName, {
         keyPath: 'id',
         autoIncrement: true,
      });
      objectStore.createIndex('gamemode', 'gamemode', { unique: false });
      objectStore.createIndex('name', 'name', { unique: false });
      objectStore.createIndex('score', 'score', { unique: false });
   }
}
