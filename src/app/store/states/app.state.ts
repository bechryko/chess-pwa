import { AuthState } from "./auth.state";
import { CoreState } from "./core.state";

export interface AppState {
   core: CoreState,
   auth: AuthState
}
