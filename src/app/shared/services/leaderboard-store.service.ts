import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { leaderboardActions } from 'src/app/store/actions/leaderboard.actions';
import { selectLeaderboardElements } from 'src/app/store/selectors/leaderboard.selectors';
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
