import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { EmptyError, Observable, combineLatest, first, map } from 'rxjs';
import { LeaderboardElement, LeaderboardElementWithId } from '../models/LeaderboardElements';
import { LeaderboardUtils } from '../utils/leaderboard.utils';
import { ErrorService } from './error.service';
import { LocalDatabaseService } from './local-database.service';

@Injectable({
   providedIn: 'root'
})
export class DatabaseSyncService {
   private readonly LEADERBOARD_TABLE_NAME = 'Leaderboards';
   private leaderboardCollection: AngularFirestoreCollection<LeaderboardElementWithId>;

   constructor(
      private localDbService: LocalDatabaseService, 
      private firestore: AngularFirestore,
      private errService: ErrorService
   ) {
      this.leaderboardCollection = this.firestore.collection<LeaderboardElementWithId>(this.LEADERBOARD_TABLE_NAME);
   }

   public syncLeaderboardEntries(): void {
      combineLatest([
         this.getStoredLeaderboardElements(),
         this.localDbService.storedItems$
      ]).pipe(
         first()
      ).subscribe({
         next: ([storedElements, localElements]) => {
            this.syncDatabases(storedElements, localElements);
         },
         error: (_: EmptyError) => {
            this.errService.popupError("Failed synchronizing with cloud database!");
         }
      });
   }

   private syncDatabases(storedElements: LeaderboardElement[], localElements: LeaderboardElement[]): void {
      storedElements.filter(storedElement => {
         return !localElements.some(localElement => {
            return LeaderboardUtils.equals(localElement, storedElement);
         });
      }).forEach(element => {
         this.localDbService.addItems(element);
      });
      localElements.filter(clientEntry => {
         return !storedElements.some(serverEntry => {
            return LeaderboardUtils.equals(clientEntry, serverEntry);
         });
      }).forEach((element, index) => {
         const newElement = element as LeaderboardElementWithId;
         newElement.id = storedElements.length + index;
         this.storeLeaderboardElement(newElement).catch(error => { 
            console.error(error);
            this.errService.popupError("Failed to save to cloud database!");
         });
      });
   }

   private getStoredLeaderboardElements(): Observable<LeaderboardElement[]> {
      return this.leaderboardCollection.get().pipe(
         map((elements) => elements.docs.map(doc => doc.data()))
      );
   }

   private storeLeaderboardElement(newEntry: LeaderboardElementWithId): Promise<void> {
      return this.leaderboardCollection.doc(newEntry.id.toString()).set(newEntry);
   }
}
