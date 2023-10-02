import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, first, map } from 'rxjs';
import { LeaderboardElementWithId } from '../models/LeaderboardElements';

@Injectable({
   providedIn: 'root'
})
export class FirestoreHandlerService {
   private readonly LEADERBOARD_TABLE_NAME = 'Leaderboards';
   private leaderboardCollection: AngularFirestoreCollection<LeaderboardElementWithId>;

   constructor(
      private firestore: AngularFirestore
   ) {
      this.leaderboardCollection = this.firestore.collection<LeaderboardElementWithId>(this.LEADERBOARD_TABLE_NAME);
   }

   public getLeaderboardElements(): Promise<LeaderboardElementWithId[]> {
      return new Promise<LeaderboardElementWithId[]>((resolve, reject) => {
         this.getFromFirestore().pipe(
            first()
         ).subscribe({
            next: elements => resolve(elements),
            error: err => reject(err)
         });
      });
   }

   public storeLeaderboardElement(newEntry: LeaderboardElementWithId): Promise<void> {
      return this.leaderboardCollection.doc(newEntry.id.toString()).set(newEntry);
   }

   private getFromFirestore(): Observable<LeaderboardElementWithId[]> {
      return this.leaderboardCollection.get().pipe(
         map((elements) => elements.docs.map(doc => doc.data()))
      );
   }
}
