import { createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { GameSave } from "src/app/shared/models/GameSave";
import { gameActions } from "../actions/game.actions";

export const gameAdapter = createEntityAdapter<GameSave>({
   selectId: save => save.mode
});

export const gameReducer = createReducer(
   gameAdapter.getInitialState(),
   on(gameActions.updateSave, (state, { save }) =>
      gameAdapter.setOne(save, state)
   ),
   on(gameActions.endGame, (state, { mode }) =>
      gameAdapter.removeOne(mode, state)
   )
);
