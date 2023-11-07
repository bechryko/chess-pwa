// @index('./*', (f, _) => `export { ${_.camelCase(f.path)} } from '${f.path}';`)
export { authReducer } from './auth.reducer';
export { coreReducer } from './core.reducer';
export { leaderboardReducer } from './leaderboard.reducer';
