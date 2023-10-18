import { TestBed } from "@angular/core/testing";
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from "@ngrx/store";
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { getTestScheduler, hot } from "jasmine-marbles";
import { Observable } from "rxjs";
import { LeaderboardElementWithId } from "src/app/shared/models/LeaderboardElements";
import { DatabaseProxyService } from "src/app/shared/services/database-proxy.service";
import { leaderboardActions } from "../actions/leaderboard.actions";
import { selectIsOfflineQueueHandled, selectLeaderboardElements } from "../selectors/leaderboard.selectors";
import { LeaderboardState } from "../states/leaderboard.state";
import { LeaderboardEffects } from "./leaderboard.effects";

describe('LeaderboardEffects', () => {
   let databaseProxyServiceSpy: jasmine.SpyObj<DatabaseProxyService>;
   let effects: LeaderboardEffects;
   let actions$ = new Observable<Action>;

   const newItem: LeaderboardElementWithId = {
      id: 0,
      gamemode: 'pvp',
      name: 'test name',
      score: 100
   };
   const newItems: LeaderboardElementWithId[] = [newItem, { ...newItem, id: 1 }];
   const testError = "test error";

   beforeEach(() => {
      databaseProxyServiceSpy = jasmine.createSpyObj('DatabaseProxyService', ['addItem', 'getAllElements']);

      TestBed.configureTestingModule({
         providers: [
            LeaderboardEffects,
            provideMockStore<LeaderboardState>(),
            provideMockActions(() => actions$),
            {
               provide: DatabaseProxyService,
               useValue: databaseProxyServiceSpy
            },
            selectLeaderboardElements
         ]
      });

      TestBed.inject(MockStore).overrideSelector(selectIsOfflineQueueHandled, true);
      databaseProxyServiceSpy.addItem.and.resolveTo();
      databaseProxyServiceSpy.getAllElements.and.resolveTo(newItems);
      effects = TestBed.inject(LeaderboardEffects);
   });

   describe('addElement$', () => {
      it('handles success correctly', (done: DoneFn) => {
         actions$ = hot('a', { a: leaderboardActions.addElement({ element: newItem }) });
         effects.addElement$.subscribe(value => {
            expect((value as any).element).withContext("success action payload is correct").toBe(newItem);
            expect(value.type).withContext("success action type is correct").toBe(leaderboardActions.addElementSuccess.type);
            done();
         });
         getTestScheduler().flush();
         expect(databaseProxyServiceSpy.addItem).withContext("add item to database").toHaveBeenCalledWith(newItem);
      });

      it('handles error correctly', (done: DoneFn) => {
         databaseProxyServiceSpy.addItem.and.rejectWith({ error: testError });
         actions$ = hot('a', { a: leaderboardActions.addElement({ element: newItem }) });
         effects.addElement$.subscribe(value => {
            expect((value as any).error.error).withContext("action error is correct").toBe(testError);
            expect(value.type).withContext("action type is correct").toBe(leaderboardActions.localDatabaseError.type);
            done();
         });
         getTestScheduler().flush();
      });
   });

   describe('pullData$', () => {
      it('sets local elements', (done: DoneFn) => {
         actions$ = hot('a', { a: leaderboardActions.pullDataFromCloud() });
         effects.pullData$.subscribe(value => {
            expect((value as any).elements).withContext("set action payload is correct").toBe(newItems);
            expect(value.type).withContext("set action type is correct").toBe(leaderboardActions.setLocalElements.type);
            done();
         });
         getTestScheduler().flush();
      });
   });
});
