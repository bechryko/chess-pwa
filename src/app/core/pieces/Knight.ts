import { PieceColor, PieceType } from "../enums";
import { Position } from "../models";
import { Piece } from "./Piece";

export class Knight extends Piece {
   constructor(color: PieceColor, pos: Position) {
      super(color, PieceType.KNIGHT, pos, {
         directions: [[1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]],
         maxSteps: 1
      });
   }
}
