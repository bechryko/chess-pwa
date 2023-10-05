import { createActionGroup, props } from "@ngrx/store";
import { GameSave } from "src/app/shared/models/GameSave";
import { Gamemode } from "src/app/shared/models/Gamemode";

export const gameActions = createActionGroup({
   source: "Game",
   events: {
      "Update Save": props<{ save: GameSave }>(),
      "End Game": props<{ mode: Gamemode }>()
   }
});
