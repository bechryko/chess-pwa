import { CheckType, PieceColor } from "@chess-core";
import { Gamemode } from "../enums/Gamemode";

export interface GameData {
   displayBoard: string[][];
   announcement: string;
   gamemode: Gamemode;
   winner: CheckType;
   turnNumber: number;
   humanPlayers: PieceColor[];
}
