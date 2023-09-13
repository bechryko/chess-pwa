/// <reference lib="webworker" />

import { ChessAI } from "src/assets/chess/AI";
import { Game } from "src/assets/chess/Game";

addEventListener('message', (event: MessageEvent<Game>) => {
   const data = event.data;
   const move = ChessAI.getBestMove(data);
   postMessage(move);
});
