import { Position } from "./models/Position";

export class Move {
   static readonly HORIZONTAL_MOVE_PATTERNS = [[0, 1], [1, 0], [0, -1], [-1, 0]];
   static readonly DIAGONAL_MOVE_PATTERNS = [[1, 1], [1, -1], [-1, -1], [-1, 1]];

   constructor(
      public from: Position,
      public to: Position
   ) { }

   public equals(move: Readonly<Move>): boolean {
      return this.from.x == move.from.x && this.from.y == move.from.y && this.to.x == move.to.x && this.to.y == move.to.y;
   }
}
