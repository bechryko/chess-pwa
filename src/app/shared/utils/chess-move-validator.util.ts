import { Game } from "src/assets/chess/Game";
import { Move } from "src/assets/chess/Move";
import { Position } from "src/assets/chess/utility";

export class ChessMoveValidatorUtil {

   public static isMoveValid(game: Game, move: Move): boolean {
      return this.getPossibleMoves(game, move.from).some(pos => pos.x === move.to.x && pos.y === move.to.y);
   }

   public static getPossibleMoves(game: Game, pos: Position): Position[] {
      const piece = game.getPiece(pos);
      if (!piece || piece.color !== game.current) {
         return [];
      }
      return piece.getPossibleMoves(game).map(move => move.to);
   }

}
