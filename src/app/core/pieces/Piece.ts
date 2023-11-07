import { Game } from '../Game';
import { Move } from '../Move';
import { PieceColor, PieceType } from '../enums';
import { MovePattern, Position } from '../models';

export class Piece {
   constructor(
      public color: PieceColor,
      public type: PieceType,
      public pos: Position,
      public readonly movePattern: MovePattern
   ) { }

   public step(move: Readonly<Move>, game: Game): void {
      const targetPiece = game.getPiece(move.to);
      if (targetPiece !== null) {
         game.pieces.splice(game.pieces.indexOf(targetPiece), 1);
      }
      this.pos = move.to;
      if (move.to.y == (this.color == PieceColor.WHITE ? 7 : 0)) {
         if (move.to.x == 0) {
            game.castling[Game.getOtherColor(this.color)].queen = false;
         } else if (move.to.x == 7) {
            game.castling[Game.getOtherColor(this.color)].king = false;
         }
      }
   }

   public getPossibleMoves(game: Readonly<Game>, captureKing = false): Move[] {
      const moves: Move[] = [];
      for (const direction of this.movePattern.directions) {
         for (let i = 1; i <= this.movePattern.maxSteps; i++) {
            const move = new Move(this.pos, {
               x: this.pos.x + direction[0] * i,
               y: this.pos.y + direction[1] * i
            });
            if (!game.isInBounds(move.to)) {
               break;
            }
            const piece = game.getPiece(move.to);
            if (piece) {
               if (piece.color != this.color && (captureKing || piece.type !== PieceType.KING)) {
                  moves.push(move);
               }
               break;
            }
            moves.push(move);
         }
      }
      return moves;
   }

   public getIcon(): string {
      return `${this.type as string}-${this.color == PieceColor.BLACK ? "black" : "white"}`;
   }
   public getChar(): string {
      if (this.type == PieceType.KNIGHT) {
         return this.color == PieceColor.BLACK ? "n" : "N";
      }
      let char = this.type[0] as string;
      if (this.color == PieceColor.WHITE) {
         char = char.toUpperCase();
      }
      return char;
   }

   public copy(): Piece {
      return new Piece(this.color, this.type, { ...this.pos }, this.movePattern);
   }
}
