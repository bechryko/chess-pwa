export enum PieceColor {
    WHITE = "white",
    BLACK = "black"
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
