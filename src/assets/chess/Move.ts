import { Position } from './utility';

export class Move {
   static HORIZONTAL_MOVE_PATTERNS: number[][] = [[0, 1], [1, 0], [0, -1], [-1, 0]];
   static DIAGONAL_MOVE_PATTERNS: number[][] = [[1, 1], [1, -1], [-1, -1], [-1, 1]];

   constructor(
      public from: Position,
      public to: Position
   ) { }

   public equals(move: Move): boolean {
      return this.from.x == move.from.x && this.from.y == move.from.y && this.to.x == move.to.x && this.to.y == move.to.y;
   }
}

export interface MovePattern {
   directions: number[][];
   maxSteps: number;
}
