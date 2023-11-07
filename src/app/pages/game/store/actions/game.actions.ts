import { Gamemode } from "@chess-enums";
import { GameSave } from "@chess-models";
import { createActionGroup, props } from "@ngrx/store";

export const gameActions = createActionGroup({
   source: "Game",
   events: {
      "Update Save": props<{ save: GameSave }>(),
      "End Game": props<{ mode: Gamemode }>()
   }
});
