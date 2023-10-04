import { Game } from "src/assets/chess/Game";
import { PieceColor } from "src/assets/chess/utility";
import { Gamemode } from "./Gamemode";

export interface GameSave {
   game: Game,
   humanPlayers: PieceColor[],
   mode: Gamemode
}
