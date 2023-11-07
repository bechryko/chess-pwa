import { Gamemode } from "@chess-enums";
import { GameSave } from "@chess-models";
import { Dictionary } from "@ngrx/entity";
import { MemoizedSelector, createFeatureSelector, createSelector } from "@ngrx/store";
import { gameAdapter } from "../reducers/game.reducer";
import { GameState } from "../states/game.state";

const selectGame = createFeatureSelector<GameState>("game");

export const selectSaves = createSelector(
   selectGame,
   state => gameAdapter.getSelectors().selectEntities(state)
);

type GameSelector = MemoizedSelector<object, GameSave | undefined, (s1: Dictionary<GameSave>) => GameSave | undefined>;
type GameSelectorRecord = Record<Gamemode, GameSelector>;

export const selectSaveByMode: GameSelectorRecord = {} as GameSelectorRecord;
for(const mode of Object.values(Gamemode)) {
   const typedMode = mode as Gamemode;
   selectSaveByMode[typedMode] = createSelector(
      selectSaves,
      save => save[typedMode]
   );
}
