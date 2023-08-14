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

export function filter<T>(arr: Readonly<Array<T>>, func: Function): Array<T> {
   const ret: Array<T> = [];
   for (let i = 0; i < arr.length; i++) {
      if (func(arr[i])) {
         ret.push(arr[i]);
      }
   }
   return ret;
}
