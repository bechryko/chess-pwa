import { AuthState } from "./auth.state";
import { CoreState } from "./core.state";
import { LeaderboardState } from "./leaderboard.state";

export interface AppState {
   core: CoreState,
   auth: AuthState,
   leaderboard: LeaderboardState
}
