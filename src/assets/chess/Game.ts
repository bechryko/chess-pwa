import { Move } from './Move';
import * as pieces from './Piece';
import { PieceColor, PieceType, Position, filter } from './utility';

type CheckType = PieceColor | "none" | "stalemate";

export class Game {
   public pieces: pieces.Piece[];
   public current: PieceColor = PieceColor.WHITE;
   public castling = { white: { king: true, queen: true }, black: { king: true, queen: true } };
   public turn = 0;
   public ended = false;

   constructor(initEmpty = false) {
      if (initEmpty) {
         this.pieces = [];
         return;
      }
      this.pieces = [];
      for (const color of [PieceColor.WHITE, PieceColor.BLACK]) {
         const baseRow = color == PieceColor.WHITE ? 0 : 7;
         const pawnRow = color == PieceColor.WHITE ? 1 : 6;
         for (let i = 0; i < 8; i++) {
            this.pieces.push(new pieces.Pawn(color, { x: i, y: pawnRow }));
         }
         this.pieces.push(new pieces.Rook(color, { x: 0, y: baseRow }));
         this.pieces.push(new pieces.Rook(color, { x: 7, y: baseRow }));
         this.pieces.push(new pieces.Knight(color, { x: 1, y: baseRow }));
         this.pieces.push(new pieces.Knight(color, { x: 6, y: baseRow }));
         this.pieces.push(new pieces.Bishop(color, { x: 2, y: baseRow }));
         this.pieces.push(new pieces.Bishop(color, { x: 5, y: baseRow }));
         this.pieces.push(new pieces.Queen(color, { x: 3, y: baseRow }));
         this.pieces.push(new pieces.King(color, { x: 4, y: baseRow }));
      }
   }

   public getPiece(pos: Readonly<Position>): pieces.Piece | null {
      for (const piece of this.pieces) {
         if (piece.pos.x == pos.x && piece.pos.y == pos.y) {
            return piece;
         }
      }
      return null;
   }

   public getKing(color: Readonly<PieceColor>): pieces.King {
      const king = this.pieces.find(piece => piece.type == PieceType.KING && piece.color == color) as pieces.King;
      if (!king) {
         console.log(this.pieces);
         throw new Error("King not found");
      }
      return king;
   }

   public static getOtherColor(color: PieceColor): PieceColor {
      return color == PieceColor.WHITE ? PieceColor.BLACK : PieceColor.WHITE;
   }

   public getPossibleMoves(color: Readonly<PieceColor>): Move[] {
      let moves: Move[] = [];
      for (const piece of this.pieces) {
         if (piece.color == color) {
            moves.push(...piece.getPossibleMoves(this));
         }
      }
      const king = this.getKing(Game.getOtherColor(color));
      moves = filter(moves, (move: Move) => !(move.to.x == king.pos.x && move.to.y == king.pos.y));
      moves = filter(moves,
         (move: Move) => {
            const newGame = this.copy();
            const piece = newGame.getPiece(move.from) as pieces.Piece;
            piece.step(move, newGame);
            return !newGame.isCheck(color);
         }
      );
      return moves;
   }

   public isInBounds(pos: Readonly<Position>): boolean {
      return pos.x >= 0 && pos.x < 8 && pos.y >= 0 && pos.y < 8;
   }

   public isCheck(color: Readonly<PieceColor>): boolean {
      const king = this.getKing(color);
      for (const enemyPiece of filter(this.pieces, (piece: pieces.Piece) => piece.color != color)) {
         const moves = enemyPiece.getPossibleMoves(this);
         for (const move of moves) {
            if (move.to.x == king.pos.x && move.to.y == king.pos.y) {
               return true;
            }
         }
      }
      return false;
   }

   public isCheckmate(): CheckType {
      for (const color of [PieceColor.WHITE, PieceColor.BLACK]) {
         if (this.getPossibleMoves(color).length == 0 && this.isCheck(color)) {
            return color;
         }
      }
      return "none";
   }

   public isStalemate(): boolean {
      return this.getPossibleMoves(this.current).length == 0;
   }

   public makeMove(move: Readonly<Move>): boolean {
      if (this.ended) {
         return false;
      }
      const piece = this.getPiece(move.from) as pieces.Piece;
      if (piece == null || piece.color != this.current) {
         return false;
      }
      if (!piece.getPossibleMoves(this).some(m => m.equals(move))) {
         return false;
      }
      piece.step(move, this);
      if (piece.type == PieceType.KING && Math.abs(move.from.x - move.to.x) == 2) {
         const rook = this.getPiece({ x: move.to.x == 2 ? 0 : 7, y: move.to.y }) as pieces.Rook;
         rook.step(new Move(rook.pos, { x: move.to.x == 2 ? 3 : 5, y: move.to.y }), this);
      }
      if (this.current == PieceColor.WHITE) {
         this.current = PieceColor.BLACK;
      } else {
         this.current = PieceColor.WHITE;
         this.turn++;
      }
      if (this.getWinner() !== "none") {
         this.ended = true;
      }
      return true;
   }

   public copy(): Game {
      const game = new Game(true);
      game.pieces = this.pieces.map(piece => piece.copy());
      game.current = this.current;
      game.castling = {
         white: { king: this.castling.white.king, queen: this.castling.white.queen },
         black: { king: this.castling.black.king, queen: this.castling.black.queen }
      };
      return game;
   }

   public printBoard(): void {
      const board: string[][] = [];
      for (let i = 0; i < 8; i++) {
         board.push([]);
         for (let j = 0; j < 8; j++) {
            board[i].push(" ");
         }
      }
      for (const piece of this.pieces) {
         board[piece.pos.y][piece.pos.x] = piece.getChar();
      }
      for (const row of board) {
         console.log(row.join(""));
      }
   }

   public getWinner(): CheckType {
      if (this.isCheckmate() !== "none") {
         return Game.getOtherColor(this.current);
      }
      if (this.isStalemate()) {
         return "stalemate";
      }
      return "none";
   }
}
