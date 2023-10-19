import { CheckType, PieceColor } from "@chess-core";

export interface GameData {
   displayBoard: string[][];
   announcement: string;
   gamemode: "pvp" | "pve" | "eve";
   winner: CheckType;
   turnNumber: number;
   humanPlayers: PieceColor[];
}
