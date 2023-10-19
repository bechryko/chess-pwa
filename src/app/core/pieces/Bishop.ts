import { Move } from "../Move";
import { PieceColor, PieceType } from "../enums";
import { Position } from "../models";
import { Piece } from "./Piece";

export class Bishop extends Piece {
   constructor(color: PieceColor, pos: Position) {
      super(color, PieceType.BISHOP, pos, {
         directions: [...Move.DIAGONAL_MOVE_PATTERNS],
         maxSteps: 8
      });
   }
}
