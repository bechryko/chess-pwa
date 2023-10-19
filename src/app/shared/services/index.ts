// @index('./*.service.ts', (f, _) => `export { ${_.pascalCase(f.path)} } from '${f.path}';`)
export { AuthService } from './auth.service';
export { CheatCodeService } from './cheat-code.service';
export { ChessPreloadingStrategyService } from './chess-preloading-strategy.service';
export { DatabaseProxyService } from './database-proxy.service';
export { ErrorService } from './error.service';
export { FirestoreHandlerService } from './firestore-handler.service';
export { IdbService } from './idb.service';
export { LeaderboardStoreService } from './leaderboard-store.service';
export { UserService } from './user.service';
