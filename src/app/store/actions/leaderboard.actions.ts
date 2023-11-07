import { LeaderboardElementWithId } from "@chess-models";
import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const leaderboardActions = createActionGroup({
   source: "Leaderboard",
   events: {
      "Add Element": props<{ element: LeaderboardElementWithId }>(),
      "Add Element Success": props<{ element: LeaderboardElementWithId }>(),
      "Pull Data from Cloud": emptyProps(),
      "Set Local Elements": props<{ elements: LeaderboardElementWithId[] }>(),
      "Local Database Error": props<{ error: string }>()
   }
});
