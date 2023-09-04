import { Game } from "src/assets/chess/Game";
import { PieceColor } from "src/assets/chess/utility";

export interface GameSave {
   game: Game,
   humanPlayers: PieceColor[]
}
