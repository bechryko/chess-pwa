import { Component } from '@angular/core';
import { Game } from 'src/assets/chess/Game';
import { Move } from 'src/assets/chess/Move';
import { Piece } from 'src/assets/chess/Piece';
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
        this.game.printBoard();
        this.displayBoard = [];
        for(let i = 0; i < 8; i++) {
            this.displayBoard.push([]);
            for(let j = 0; j < 8; j++) {
                this.displayBoard[i].push("empty");
            }
        }
        this.updateDisplayBoard();
    }

    public onTileClick(x: number, y: number): void {
        //console.log(x, y, this.game.getPiece({x, y}), this.selectedPiece);
        if(!this.selectedPosition) {
            this.selectedPosition = {x, y};
            return;
        }
        const success = this.playerMove(new Move(this.selectedPosition, {x, y}));
        if(!success) {
            this.selectedPosition = {x, y};
            return;
        }
        //this.aiMove();
        this.updateDisplayBoard();
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
}
