//  @index('./*', (f, _) => `export { ${_.pascalCase(f.path)} } from '${f.path}';`)
export { Bishop } from './Bishop';
export { King } from './King';
export { Knight } from './Knight';
export { Pawn } from './Pawn';
export { Piece } from './Piece';
export { Queen } from './Queen';
export { Rook } from './Rook';
