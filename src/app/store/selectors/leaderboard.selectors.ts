import { createFeatureSelector, createSelector } from "@ngrx/store";
import { leaderboardAdapter } from "../reducers/leaderboard.reducer";
import { LeaderboardState } from "../states/leaderboard.state";

export const selectLeaderboard = createFeatureSelector<LeaderboardState>("leaderboard");

export const selectLeaderboardElements = createSelector(
   selectLeaderboard,
   leaderboardAdapter.getSelectors().selectAll
);

export const selectIsOfflineQueueHandled = createSelector(
   selectLeaderboard,
   state => state.isOfflineQueueHandled
);
