import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "../states/auth.state";

export const selectAuth = createFeatureSelector<AuthState>("auth");

export const selectUsername = createSelector(
   selectAuth,
   (state: AuthState) => state.username
);
export const selectIsLoggedIn = createSelector(
   selectAuth,
   (state: AuthState) => state.isLoggedIn
);
export const selectIsLoading = createSelector(
   selectAuth,
   (state: AuthState) => state.isLoading
);
