import { createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { LeaderboardElementWithId } from "src/app/shared/models/LeaderboardElements";
import { leaderboardActions } from "../actions/leaderboard.actions";
import { LeaderboardState } from "../states/leaderboard.state";

export const leaderboardAdapter = createEntityAdapter<LeaderboardElementWithId>();

export const leaderboardReducer = createReducer(
   leaderboardAdapter.getInitialState({
      isOfflineQueueHandled: false
   }) as LeaderboardState,
   on(leaderboardActions.addElementSuccess, (state, { element }) =>
      leaderboardAdapter.addOne(element, state)
   ),
   on(leaderboardActions.setLocalElements, (state, { elements }) =>
      leaderboardAdapter.addMany(elements, leaderboardAdapter.removeAll({
         ...state,
         isOfflineQueueHandled: true
      }))
   )
);
