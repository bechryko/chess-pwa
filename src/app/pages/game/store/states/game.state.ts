import { GameSave } from "@chess-models";
import { EntityState } from "@ngrx/entity";

export interface GameState extends EntityState<GameSave> {}
