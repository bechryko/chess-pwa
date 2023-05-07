import * as pieces from './Piece';
import { PieceColor, Position, PieceType } from './utility';
import { Move } from './Move';

export class Game {
    public pieces: pieces.Piece[];
    public current: PieceColor = PieceColor.WHITE;

    constructor(initEmpty: boolean = false) {
        if(initEmpty) {
            this.pieces = [];
            return;
        }
        this.pieces = [];
        for(const color of [PieceColor.WHITE, PieceColor.BLACK]) {
            const baseRow = color == PieceColor.WHITE ? 0 : 7;
            const pawnRow = color == PieceColor.WHITE ? 1 : 6;
            for(let i = 0; i < 8; i++) {
                this.pieces.push(new pieces.Pawn(color, {x: i, y: pawnRow}));
            }
            this.pieces.push(new pieces.Rook(color, {x: 0, y: baseRow}));
            this.pieces.push(new pieces.Rook(color, {x: 7, y: baseRow}));
            this.pieces.push(new pieces.Knight(color, {x: 1, y: baseRow}));
            this.pieces.push(new pieces.Knight(color, {x: 6, y: baseRow}));
            this.pieces.push(new pieces.Bishop(color, {x: 2, y: baseRow}));
            this.pieces.push(new pieces.Bishop(color, {x: 5, y: baseRow}));
            this.pieces.push(new pieces.Queen(color, {x: 3, y: baseRow}));
            this.pieces.push(new pieces.King(color, {x: 4, y: baseRow}));
        }
    }

    public getPiece(pos: Position): pieces.Piece | null {
        for(const piece of this.pieces) {
            if(piece.pos.x == pos.x && piece.pos.y == pos.y) {
                return piece;
            }
        }
        return null;
    }

    public getKing(color: PieceColor): pieces.King {
        const king = this.pieces.find(piece => piece.type == PieceType.KING && piece.color == color) as pieces.King;
        if(!king) {
            console.log(this.pieces);
            throw new Error("King not found");
        }
        return king;
    }

    private getOtherColor(color: PieceColor): PieceColor {
        return color == PieceColor.WHITE ? PieceColor.BLACK : PieceColor.WHITE;
    }

    public getPossibleMoves(color: PieceColor): Move[] {
        let moves: Move[] = [];
        for(const piece of this.pieces) {
            if(piece.color == color) {
                moves.push(...piece.getPossibleMoves(this));
            }
        }
        const king = this.getKing(this.getOtherColor(color));
        moves = moves.filter(move => !(move.to.x == king.pos.x && move.to.y == king.pos.y));
        return moves;
    }

    public isInBounds(pos: Position): boolean {
        return pos.x >= 0 && pos.x < 8 && pos.y >= 0 && pos.y < 8;
    }

    public isCheck(color: PieceColor): boolean {
        const king = this.getKing(color);
        for(const piece of this.pieces.filter(piece => piece.color != color)) {
            for(const move of piece.getPossibleMoves(this)) {
                if(move.to.x == king.pos.x && move.to.y == king.pos.y) {
                    return true;
                }
            }
        }
        return false;
    }

    public isCheckmate(): PieceColor | null {
        for(const color of [PieceColor.WHITE, PieceColor.BLACK]) {
            const king = this.getKing(color);
            const kingMoves = king.getPossibleMoves(this);
            const movesAttackingKing = this.getPossibleMoves(color == PieceColor.WHITE ? PieceColor.BLACK : PieceColor.WHITE).filter(move => move.to.x == king.pos.x && move.to.y == king.pos.y);
            if(kingMoves.length == 0 && movesAttackingKing.length > 0) {
                return color;
            }
        }
        return null;
    }

    public isStalemate(): boolean {
        return this.getPossibleMoves(this.current).length == 0;
    }

    public makeMove(move: Move): boolean {
        const piece = this.getPiece(move.from) as pieces.Piece;
        if(piece == null || piece.color != this.current) {
            return false;
        }
        if(!piece.getPossibleMoves(this).some(m => m.equals(move))) {
            return false;
        }
        const targetPiece = this.getPiece(move.to);
        if(targetPiece != null) {
            this.pieces.splice(this.pieces.indexOf(targetPiece as pieces.Piece), 1);
        }
        piece.step(move);
        if(piece.type == PieceType.PAWN && (piece.pos.y == 0 || piece.pos.y == 7)) {
            this.pieces.splice(this.pieces.indexOf(piece), 1);
            this.pieces.push(new pieces.Queen(piece.color, piece.pos));
        }
        this.current = this.current == PieceColor.WHITE ? PieceColor.BLACK : PieceColor.WHITE;
        return true;
    }

    public copy(): Game {
        const game = new Game(true);
        game.pieces = this.pieces.map(piece => piece.copy());
        game.current = this.current;
        return game;
    }

    public printBoard(): void {
        const board: string[][] = [];
        for(let i = 0; i < 8; i++) {
            board.push([]);
            for(let j = 0; j < 8; j++) {
                board[i].push(" ");
            }
        }
        for(const piece of this.pieces) {
            board[piece.pos.y][piece.pos.x] = piece.getChar();
        }
        for(const row of board) {
            console.log(row.join(""));
        }
    }
}
