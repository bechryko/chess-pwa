import { AuthUser, AuthUserWithoutName, ChessUser } from "@chess-models";
import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const authActions = createActionGroup({
   source: "Auth",
   events: {
      "Register": props<{ user: AuthUser }>(),
      "Login": props<{ user: AuthUserWithoutName }>(),
      "Logout": emptyProps(),
      "Load Authentication": emptyProps(),
      "Login Success": props<{ user: ChessUser, doNavigate: boolean }>(),
      "Clear User": emptyProps(),
      "Authentication Error": props<{ error: string }>()
   }
});
