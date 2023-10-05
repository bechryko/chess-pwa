import { createReducer, on } from "@ngrx/store";
import { authActions } from "../actions/auth.actions";
import { AuthState } from "../states/auth.state";

const initialState: AuthState = {
   username: null,
   isLoggedIn: false,
   isLoading: true
}

export const authReducer = createReducer(
   initialState,
   on(authActions.login, authActions.register, authActions.logout, (state) => ({
      ...state,
      isLoading: true
   })),
   on(authActions.loginSuccess, (_, { user }) => ({
      username: user.name,
      isLoggedIn: true,
      isLoading: false
   })),
   on(authActions.clearUser, (_) => ({
      username: null,
      isLoading: false,
      isLoggedIn: false
   })),
   on(authActions.authenticationError, (state, _) => ({
      ...state,
      isLoading: false
   }))
);
