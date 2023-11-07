import { Game, Move, Position } from '@chess-core';

export class ChessMoveValidatorUtils {

   public static isMoveValid(game: Game, move: Move): boolean {
      return this.getPossibleMoves(game, move.from).some(pos => pos.x === move.to.x && pos.y === move.to.y);
   }

   public static getPossibleMoves(game: Game, pos: Position): Position[] {
      const moves = game.getPossibleMoves(game.current).filter((move: Move) => move.from.x === pos.x && move.from.y === pos.y);
      return moves.map(move => move.to);
   }

}
