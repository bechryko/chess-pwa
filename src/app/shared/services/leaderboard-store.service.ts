import { Injectable } from '@angular/core';
import { leaderboardActions } from '@chess-store/actions';
import { selectLeaderboardElements } from '@chess-store/selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LeaderboardElement, LeaderboardElementWithId } from '../models/LeaderboardElements';

@Injectable({
   providedIn: 'root'
})
export class LeaderboardStoreService {

   public storedItems$: Observable<LeaderboardElement[]>;

   constructor(
      private store: Store
   ) {
      this.storedItems$ = this.store.select(selectLeaderboardElements);
   }

   public storeItem(newItem: LeaderboardElement): void {
      const newItemWithId: LeaderboardElementWithId = {
         ...newItem,
         id: Date.now() //TODO
      };
      this.store.dispatch(leaderboardActions.addElement({ element: newItemWithId }));
   }

   public pullDataFromCloud(): void {
      this.store.dispatch(leaderboardActions.pullDataFromCloud());
   }
}
