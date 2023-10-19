import { Game } from "../Game";
import { Move } from "../Move";
import { PieceColor, PieceType } from "../enums";
import { Position } from "../models";
import { Piece } from "./Piece";

export class King extends Piece {
   constructor(color: PieceColor, pos: Position) {
      super(color, PieceType.KING, pos, {
         directions: [...Move.HORIZONTAL_MOVE_PATTERNS, ...Move.DIAGONAL_MOVE_PATTERNS],
         maxSteps: 1
      });
   }

   public override getPossibleMoves(game: Readonly<Game>): Move[] {
      const moves = super.getPossibleMoves(game);
      const castling = game.castling[this.color];
      if (castling.queen && !game.getPiece({ x: 1, y: this.pos.y }) && !game.getPiece({ x: 2, y: this.pos.y }) && !game.getPiece({ x: 3, y: this.pos.y })) {
         moves.push(new Move(this.pos, { x: 2, y: this.pos.y }));
      }
      if (castling.king && !game.getPiece({ x: 5, y: this.pos.y }) && !game.getPiece({ x: 6, y: this.pos.y })) {
         moves.push(new Move(this.pos, { x: 6, y: this.pos.y }));
      }
      return moves;
   }

   public override step(move: Readonly<Move>, game: Game): void {
      super.step(move, game);
      game.castling[this.color].queen = false;
      game.castling[this.color].king = false;
   }

   public override copy(): King {
      return new King(this.color, { ...this.pos });
   }
}
