import { Game } from "../Game";
import { Move } from "../Move";
import { PieceColor, PieceType } from "../enums";
import { Position } from "../models";
import { filter } from "../utils";
import { Piece } from "./Piece";
import { Queen } from "./Queen";

export class Pawn extends Piece {
   constructor(color: PieceColor, pos: Position) {
      super(color, PieceType.PAWN, pos, {
         directions: [[0, color == PieceColor.WHITE ? 1 : -1]],
         maxSteps: 1
      });
   }

   public override getPossibleMoves(game: Readonly<Game>, captureKing = false): Move[] {
      const moves = super.getPossibleMoves(game, captureKing);
      for (const move of moves) {
         for (const piece of filter(game.pieces, (p: Piece) => p.color != this.color)) {
            if (move.to.x == piece.pos.x && move.to.y == piece.pos.y) {
               moves.splice(moves.indexOf(move), 1);
               break;
            }
         }
      }
      const moveDirection = this.movePattern.directions[0][1];
      for (let i = -1; i <= 1; i += 2) {
         const targetPos: Position = { x: this.pos.x + i, y: this.pos.y + moveDirection };
         if (game.isInBounds(targetPos)) {
            const piece = game.getPiece(targetPos);
            if (piece && piece.color !== this.color && (captureKing || piece.type !== PieceType.KING)) {
               moves.push(new Move(this.pos, targetPos));
            }
         }
      }
      if (this.pos.y == (this.color == PieceColor.WHITE ? 1 : 6)) {
         const move = new Move(this.pos, { x: this.pos.x, y: this.pos.y + moveDirection * 2 });
         if (!game.getPiece(move.to) && !game.getPiece({ x: this.pos.x, y: this.pos.y + moveDirection })) {
            moves.push(move);
         }
      }
      return moves;
   }

   public override step(move: Readonly<Move>, game: Game): void {
      super.step(move, game);
      if (this.pos.y == 0 || this.pos.y == 7) {
         game.pieces.splice(game.pieces.indexOf(this), 1);
         game.pieces.push(new Queen(this.color, this.pos));
      }
   }

   public override copy(): Pawn {
      return new Pawn(this.color, { ...this.pos });
   }
}
