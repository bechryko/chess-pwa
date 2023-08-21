import { Game } from "src/assets/chess/Game";
import { Move } from "src/assets/chess/Move";
import { Position } from "src/assets/chess/utility";

export class ChessMoveValidatorUtil {

   public static isMoveValid(game: Game, move: Move): boolean {
      return this.getPossibleMoves(game, move.from).some(pos => pos.x === move.to.x && pos.y === move.to.y);
   }

   public static getPossibleMoves(game: Game, pos: Position): Position[] {
      const moves = game.getPossibleMoves(game.current).filter((move: Move) => move.from.x === pos.x && move.from.y === pos.y);
      return moves.map(move => move.to);
   }

}
