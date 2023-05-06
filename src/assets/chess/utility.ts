export enum PieceColor {
    WHITE = 0,
    BLACK = 1
}

export enum PieceType {
    PAWN = "pawn",
    ROOK = "rook",
    KNIGHT = "knight",
    BISHOP = "bishop",
    QUEEN = "queen",
    KING = "king"
}

export interface Position {
    x: number;
    y: number;
}
