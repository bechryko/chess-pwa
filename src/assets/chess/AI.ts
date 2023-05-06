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

    static getPossibleMoves(game: Game): Move[] {
        const moves: Move[] = [];
        for(const piece of game.pieces) {
            if(piece.color == game.current) {
                moves.push(...piece.getPossibleMoves(game));
            }
        }
        return moves;
    }

    static heuristicValue(game: Game): number {
        let value = 0;
        for(const piece of game.pieces) {
            value += this.PIECE_VALUES[piece.type as string] * (piece.color == game.current ? 1 : -1);
        }
        return value;
    }
}
