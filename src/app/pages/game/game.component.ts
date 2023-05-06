import { Component } from '@angular/core';
import { Game } from 'src/assets/chess/Game';
import { Piece } from 'src/assets/chess/Piece';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
    private game: any;
    public displayBoard: (Piece | null)[][] = [];

    constructor() {
        this.game = new Game();
        this.game.printBoard();
        this.updateDisplayBoard();

        console.log(this.game.isCheckmate());
        for(const piece of this.game.pieces) {
            console.log(piece.pos, piece.getPossibleMoves(this.game));
        }
    }

    public updateDisplayBoard(): void {
        this.displayBoard = [];
        for(let i = 0; i < 8; i++) {
            this.displayBoard.push([]);
            for(let j = 0; j < 8; j++) {
                this.displayBoard[i].push(null);
            }
        }
        for(const piece of this.game.pieces) {
            this.displayBoard[piece.pos.y][piece.pos.x] = piece;
        }
    }
}
