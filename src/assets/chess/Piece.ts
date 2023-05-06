import { PieceColor, PieceType, Position } from './utility';
import { Move, MovePattern } from './Move';
import { Game } from './Game';

export class Piece {
    constructor(
        public color: PieceColor, 
        public type: PieceType,
        public pos: Position,
        public movePattern: MovePattern
    ) { }

    public step(move: Move): void {
        this.pos = move.to;
    }

    public getPossibleMoves(game: Game): Move[] {
        const moves: Move[] = [];
        for(const direction of this.movePattern.directions) {
            for(let i = 1; i <= this.movePattern.maxSteps; i++) {
                const move = new Move(this.pos, {
                    x: this.pos.x + direction[0] * i,
                    y: this.pos.y + direction[1] * i
                });
                if(!game.isInBounds(move.to)) {
                    break;
                }
                const piece = game.getPiece(move.to);
                if(piece) {
                    if(piece.color != this.color) {
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
        return `assets/images/chess-${this.type as string}-${this.color == PieceColor.BLACK ? "black" : "white"}.png`;
    }
    public getChar(): string {
        if(this.type == PieceType.KNIGHT) {
            return this.color == PieceColor.BLACK ? "n" : "N";
        }
        let char = this.type[0] as string;
        if(this.color == PieceColor.WHITE) {
            char = char.toUpperCase();
        }
        return char;
    }

    public copy(): Piece {
        return new Piece(this.color, this.type, {...this.pos}, this.movePattern);
    }
}

export class Pawn extends Piece {
    constructor(color: PieceColor, pos: Position) {
        super(color, PieceType.PAWN, pos, {
            directions: [[0, 1]],
            maxSteps: 1
        });
    }
}

export class Rook extends Piece {
    constructor(color: PieceColor, pos: Position) {
        super(color, PieceType.ROOK, pos, {
            directions: [...Move.HORIZONTAL_MOVE_PATTERNS],
            maxSteps: 8
        });
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
}
