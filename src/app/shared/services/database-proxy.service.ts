import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { LeaderboardElementWithId } from '../models/LeaderboardElements';
import { DatabaseInfoUtils } from '../utils/database-info.utils';
import { FirestoreHandlerService } from './firestore-handler.service';
import { IdbService } from './idb.service';

@Injectable({
   providedIn: 'root'
})
export class DatabaseProxyService {
   private offlineQueue: LeaderboardElementWithId[] = [];

   constructor(
      private swUpdate: SwUpdate,
      private firestoreHandler: FirestoreHandlerService,
      private idbService: IdbService
   ) {
      this.swUpdate.checkForUpdate().then(isUpdate => {
         if (isUpdate) {
            alert("New version of the app is available. Click OK to reload the app.");
            window.location.reload();
         }
      });
      addEventListener('online', () => {
         const queue = [...this.offlineQueue];
         this.offlineQueue = [];
         queue.forEach(element => this.addItem(element));
      });
      addEventListener('offline', () => {
         localStorage.setItem(DatabaseInfoUtils.LOCAL_STORAGE_KEYS.LAST_ONLINE, Date.now().toString());
      });
   }

   public addItem(newItem: LeaderboardElementWithId): Promise<void> {
      return new Promise<void>((resolve, reject) => {
         if (!navigator.onLine) {
            this.offlineQueue.push(newItem);
            this.idbService.storeItem(newItem)
               .then(_ => resolve())
               .catch(error => reject(error));
         } else {
            this.idbService.storeItem(newItem)
               .then(_ => this.firestoreHandler.storeLeaderboardElement(newItem).then(_ => resolve()))
               .catch(error => reject(error));
         }
      });
   }

   public getAllElements(startup = false): Promise<LeaderboardElementWithId[]> {
      if (startup) {
         this.idbService.readItems().then(elements => {
            const offlineElements = elements
               .filter(element => element.id > this.getLastOnlineTimestamp());
            offlineElements.forEach(element => this.firestoreHandler.storeLeaderboardElement(element));
         });
      }
      if (navigator.onLine) {
         return new Promise((resolve, _) => {
            this.firestoreHandler.getLeaderboardElements().then(elements => {
               this.idbService.setItems(elements);
               resolve(elements);
            });
         });
      }
      return this.idbService.readItems();
   }

   private getLastOnlineTimestamp(): number {
      const item = localStorage.getItem(DatabaseInfoUtils.LOCAL_STORAGE_KEYS.LAST_ONLINE);
      if (item === null || isNaN(Number(item))) {
         return Date.now();
      }
      return Number(item);
   }
}
