import { Game } from './Game';
import { Move } from './Move';
import { PieceType } from './utility';

interface NegamaxReturnValue {
   bestMove: Move | null,
   value: number
}

interface NegamaxReturnValue {
   bestMove: Move | null,
   value: number
}

interface NegamaxReturnValue {
   bestMove: Move | null,
   value: number
}

export class ChessAI {
   static readonly PIECE_VALUES: Readonly<Record<PieceType, number>> = {
      "pawn": 1,
      "rook": 5,
      "knight": 3,
      "bishop": 3,
      "queen": 9,
      "king": 0
   };
   static readonly WIN_VALUE = 13_000_000;
   static readonly THINK_DEPTH = 3;

   static heuristicValue(game: Readonly<Game>, distanceInTime: number, print: boolean = false): number {
      const checkMate = game.isCheckmate();
      if (checkMate !== "none") {
         return (checkMate == game.current ? -1 : 1) * (this.WIN_VALUE - distanceInTime);
      }
      if (game.isStalemate()) {
         return 0;
      }
      let value = 0;
      for (const piece of game.pieces) {
         value += this.PIECE_VALUES[piece.type] * 5 * (piece.color == game.current ? 1 : -1);
      }
      /*const piecesInCenter = game.pieces.filter(piece => piece.pos.x >= 3 && piece.pos.x <= 4 && piece.pos.y >= 3 && piece.pos.y <= 4);
      for(const piece of piecesInCenter) {
          if(print) console.log("center", piece)
          value += piece.color == game.current ? 1 : -1;
      }
      value -= game.pieces.length / 33;*/
      return value;
   }

   static negamax(game: Readonly<Game>, depth: number, alpha: number, beta: number, distanceInTime: number): NegamaxReturnValue {
      if (depth == 0) {
         return {
            value: this.heuristicValue(game, distanceInTime),
            bestMove: null
         };
      }
      const returnValue: NegamaxReturnValue = {
         value: -Infinity,
         bestMove: null
      };
      for (const move of game.getPossibleMoves(game.current)) {
         const newGame = game.copy();
         newGame.makeMove(move);
         const negamaxValue = -this.negamax(newGame, depth - 1, -beta, -alpha, distanceInTime + 1).value;
         if (returnValue.value < negamaxValue) {
            returnValue.value = negamaxValue;
            returnValue.bestMove = move;
         }
         alpha = Math.max(alpha, returnValue.value);
         if (alpha >= beta) {
            break;
         }
      }
      return returnValue;
   }

   static getBestMove(game: Readonly<Game>): Move {
      let { bestMove } = this.negamax(game, this.THINK_DEPTH, -Infinity, Infinity, 0);
      if (bestMove === null) {
         bestMove = game.getPossibleMoves(game.current)[0];
      }
      return bestMove;
   }
}
