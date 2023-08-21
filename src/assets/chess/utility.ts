export const PieceColor = {
   WHITE: "white",
   BLACK: "black"
} as const;
export type PieceColor = (typeof PieceColor)[keyof typeof PieceColor];

export const PieceType = {
   PAWN: "pawn",
   ROOK: "rook",
   KNIGHT: "knight",
   BISHOP: "bishop",
   QUEEN: "queen",
   KING: "king"
} as const;
export type PieceType = (typeof PieceType)[keyof typeof PieceType];

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
