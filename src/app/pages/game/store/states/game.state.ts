import { EntityState } from "@ngrx/entity";
import { GameSave } from "src/app/shared/models/GameSave";

export interface GameState extends EntityState<GameSave> {}
