import { Game } from './Game';
import { Move } from './Move';

export class ChessAI {
   static PIECE_VALUES: { [key: string]: number } = {
      "pawn": 1,
      "rook": 5,
      "knight": 3,
      "bishop": 3,
      "queen": 9,
      "king": 0
   };
   static WIN_VALUE = 13_000_000;
   static THINK_DEPTH = 2;

   static bestMove: Move | null = null;

   static heuristicValue(game: Game, distanceInTime: number, print: boolean = false): number {
      const checkMate = game.isCheckmate();
      if (checkMate !== null) {
         return (checkMate == game.current ? -1 : 1) * (this.WIN_VALUE - distanceInTime);
      }
      if (game.isStalemate()) {
         return 0;
      }
      let value = 0;
      for (const piece of game.pieces) {
         value += this.PIECE_VALUES[piece.type as string] * 5 * (piece.color == game.current ? 1 : -1);
      }
      /*const piecesInCenter = game.pieces.filter(piece => piece.pos.x >= 3 && piece.pos.x <= 4 && piece.pos.y >= 3 && piece.pos.y <= 4);
      for(const piece of piecesInCenter) {
          if(print) console.log("center", piece)
          value += piece.color == game.current ? 1 : -1;
      }
      value -= game.pieces.length / 33;*/
      return value;
   }

   static negamax(game: Game, depth: number, alpha: number, beta: number, distanceInTime: number): number {
      if (depth == 0) {
         return this.heuristicValue(game, distanceInTime);
      }
      let value = -Infinity;
      let bestMove: Move | null = null;
      for (const move of game.getPossibleMoves(game.current)) {
         const newGame = game.copy();
         newGame.makeMove(move);
         const negamaxValue = -this.negamax(newGame, depth - 1, -beta, -alpha, distanceInTime + 1);
         if (value < negamaxValue) {
            value = negamaxValue;
            bestMove = move;
         }
         alpha = Math.max(alpha, value);
         if (alpha >= beta) {
            break;
         }
      }
      this.bestMove = bestMove;
      return value;
   }

   static getBestMove(game: Game): Move {
      this.bestMove = null;
      this.negamax(game, this.THINK_DEPTH, -Infinity, Infinity, 0);
      if (this.bestMove === null) {
         this.bestMove = game.getPossibleMoves(game.current)[0];
      }
      return this.bestMove;
   }
}
