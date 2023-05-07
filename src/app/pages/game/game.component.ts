import { Component } from '@angular/core';
import { Game } from 'src/assets/chess/Game';
import { Move } from 'src/assets/chess/Move';
import { ChessAI } from 'src/assets/chess/AI';
import { Position } from 'src/assets/chess/utility';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss']
})
export class GameComponent {
    private game: any;
    private selectedPosition: Position | null = null;
    public displayBoard: string[][];
    public announcement: string = "";

    constructor() {
        this.game = new Game();
        this.displayBoard = [];
        for(let i = 0; i < 8; i++) {
            this.displayBoard.push([]);
            for(let j = 0; j < 8; j++) {
                this.displayBoard[i].push("");
            }
        }
        this.updateDisplayBoard();
    }

    public onTileClick(x: number, y: number): void {
        if(!this.selectedPosition) {
            this.selectedPosition = {x, y};
        } else if(this.selectedPosition.x == x && this.selectedPosition.y == y) {
            this.selectedPosition = null;
        } else if(!this.playerMove(new Move(this.selectedPosition, {x, y}))) {
            this.selectedPosition = {x, y};
        } else {
            this.aiMove();
            this.updateDisplayBoard();
        }
        this.syncSelections();
    }

    private playerMove(move: Move): boolean {
        this.selectedPosition = null;
        return this.game.makeMove(move);
    }

    private aiMove(): void {
        this.announcement = "Gondolkodik az AI...";
        const move = ChessAI.getBestMove(this.game);
        //console.log(this.game.current)
        this.game.makeMove(move);
        //console.log(this.game.current)
        //console.log("AI moved", move);
    }

    public updateDisplayBoard(): void {
        for(let i = 0; i < 8; i++) {
            for(let j = 0; j < 8; j++) {
                this.displayBoard[i][j] = "empty";
            }
        }
        for(const piece of this.game.pieces) {
            this.displayBoard[piece.pos.y][piece.pos.x] = piece.getIcon();
        }
        this.syncSelections();
        this.announcement = this.game.current == "white" ? "Világos lép" : "Sötét lép";
        if(this.game.isCheck(this.game.current)) {
            this.announcement += ", sakkban van";
        }
        if(this.game.isStalemate()) {
            this.announcement = "Döntetlen";
        } else if(this.game.isCheckmate()) {
            this.announcement = this.game.current == "white" ? "Sötét nyert" : "Világos nyert";
        }
    }

    public syncSelections(): void {
        const previouslyHighlighted = document.querySelectorAll(".highlighted0, .highlighted1");
        for(const tile of previouslyHighlighted as any) {
            tile.classList.remove("highlighted0", "highlighted1");
        }
        if(this.selectedPosition) {
            const highlighted: Position[] = [this.selectedPosition];
            const piece = this.game.getPiece(this.selectedPosition);
            if(piece && piece.color == this.game.current) {
                highlighted.push(...piece.getPossibleMoves(this.game).map((move: { to: Position; }) => move.to));
            } else {
                return;
            }
            for(const pos of highlighted) {
                document.querySelector(`.chessBoard .chessRow:nth-child(${8 - pos.y}) .chessTile:nth-child(${pos.x + 1})`)?.classList.add("highlighted" + (pos.y + pos.x) % 2);
            }
        }
    }
}
