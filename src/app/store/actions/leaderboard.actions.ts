import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { LeaderboardElementWithId } from "src/app/shared/models/LeaderboardElements";

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
