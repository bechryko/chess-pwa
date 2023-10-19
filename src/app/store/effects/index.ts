// @index('./*', (f, _) => `export { ${_.pascalCase(f.path)} } from '${f.path}';`)
export { AuthEffects } from './auth.effects';
export { LeaderboardEffects } from './leaderboard.effects';
