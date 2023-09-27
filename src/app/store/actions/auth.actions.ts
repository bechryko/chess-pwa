import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ChessUser } from "src/app/shared/models/ChessUser";
import { AuthUser, AuthUserWithoutName } from "src/app/shared/models/authUsers";

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
