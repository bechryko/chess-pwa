// @index('./*', (f, _) => `export { ${_.pascalCase(f.path)} } from '${f.path}';`)
export { AppState } from './app.state';
export { AuthState } from './auth.state';
export { CoreState } from './core.state';
export { LeaderboardState } from './leaderboard.state';
