import { Game } from './Game';
import { Move, MovePattern } from './Move';
import { PieceColor, PieceType, Position, filter } from './utility';

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
         game.castling[this.color].queen = false;
      }
      if (move.from.x == 7) {
         game.castling[this.color].king = false;
      }
   }

   public override copy(): Rook {
      return new Rook(this.color, { ...this.pos });
   }
}

export class Knight extends Piece {
   constructor(color: PieceColor, pos: Position) {
      super(color, PieceType.KNIGHT, pos, {
         directions: [[1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]],
         maxSteps: 1
      });
   }
}

export class Bishop extends Piece {
   constructor(color: PieceColor, pos: Position) {
      super(color, PieceType.BISHOP, pos, {
         directions: [...Move.DIAGONAL_MOVE_PATTERNS],
         maxSteps: 8
      });
   }
}

export class Queen extends Piece {
   constructor(color: PieceColor, pos: Position) {
      super(color, PieceType.QUEEN, pos, {
         directions: [...Move.HORIZONTAL_MOVE_PATTERNS, ...Move.DIAGONAL_MOVE_PATTERNS],
         maxSteps: 8
      });
   }
}

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
