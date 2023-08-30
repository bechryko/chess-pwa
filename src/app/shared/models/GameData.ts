import { CheckType } from "src/assets/chess/Game";
import { PieceColor } from "src/assets/chess/utility";

export interface GameData {
   displayBoard: string[][];
   announcement: string;
   gamemode: "pvp" | "pve" | "eve";
   winner: CheckType;
   turnNumber: number;
   humanPlayers: PieceColor[];
}
