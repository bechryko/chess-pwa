import { Move } from "../Move";
import { PieceColor, PieceType } from "../enums";
import { Position } from "../models";
import { Piece } from "./Piece";

export class Queen extends Piece {
   constructor(color: PieceColor, pos: Position) {
      super(color, PieceType.QUEEN, pos, {
         directions: [...Move.HORIZONTAL_MOVE_PATTERNS, ...Move.DIAGONAL_MOVE_PATTERNS],
         maxSteps: 8
      });
   }
}
