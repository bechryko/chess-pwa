import { Game, PieceColor } from "@chess-core";
import { Gamemode } from "./Gamemode";

export interface GameSave {
   game: Game,
   humanPlayers: PieceColor[],
   mode: Gamemode
}
