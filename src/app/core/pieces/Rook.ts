import { Game } from "../Game";
import { Move } from "../Move";
import { PieceColor, PieceType } from "../enums";
import { Position } from "../models";
import { Piece } from "./Piece";

export class Rook extends Piece {
   constructor(color: PieceColor, pos: Position) {
      super(color, PieceType.ROOK, pos, {
         directions: [...Move.HORIZONTAL_MOVE_PATTERNS],
         maxSteps: 8
      });
   }

   public override step(move: Readonly<Move>, game: Game): void {
      super.step(move, game);
      if (move.from.x == 0) {
         // game.castling[this.color].queen = false;
      }
      if (move.from.x == 7) {
         // game.castling[this.color].king = false;
      }
   }

   public override copy(): Rook {
      return new Rook(this.color, { ...this.pos });
   }
}
