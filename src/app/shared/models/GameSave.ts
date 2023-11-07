import { Game, PieceColor } from "@chess-core";
import { Gamemode } from "../enums/Gamemode";

export interface GameSave {
   game: Game,
   humanPlayers: PieceColor[],
   mode: Gamemode
}
