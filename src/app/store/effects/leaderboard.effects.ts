import { Injectable } from "@angular/core";
import { DatabaseProxyService } from "@chess-services";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, exhaustMap, from, map, of } from "rxjs";
import { leaderboardActions } from "../actions/leaderboard.actions";
import { selectIsOfflineQueueHandled } from "../selectors/leaderboard.selectors";

@Injectable()
export class LeaderboardEffects {

   public addElement$ = createEffect(() => this.actions$.pipe(
      ofType(leaderboardActions.addElement),
      exhaustMap(({ element }) => from(this.localDbService.addItem(element)).pipe(
         map(_ => leaderboardActions.addElementSuccess({ element })),
         catchError(error => of(leaderboardActions.localDatabaseError({ error })))
      ))
   ));

   public pullData$ = createEffect(() => this.actions$.pipe(
      ofType(leaderboardActions.pullDataFromCloud),
      concatLatestFrom(_ => this.store.select(selectIsOfflineQueueHandled)),
      exhaustMap(([, isOfflineQueueHandled]) => from(this.localDbService.getAllElements(!isOfflineQueueHandled)).pipe(
         map(items => leaderboardActions.setLocalElements({ elements: items })),
         catchError(error => of(leaderboardActions.localDatabaseError({ error })))
      ))
   ));

   constructor(
      private actions$: Actions,
      private localDbService: DatabaseProxyService,
      private store: Store
   ) { }
}
