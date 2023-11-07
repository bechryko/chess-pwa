// @index('./*.pipe.ts', (f, _) => `export { ${_.pascalCase(f.path)} } from '${f.path}';`)
export { ReversePipe } from './reverse.pipe';
export { SentenceCasePipe } from './sentence-case.pipe';
export { SortPipe } from './sort.pipe';
