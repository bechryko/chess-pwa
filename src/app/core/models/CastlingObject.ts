import { PieceColor } from "../enums";

export type CastlingObject = Record<PieceColor, { king: boolean, queen: boolean }>;
