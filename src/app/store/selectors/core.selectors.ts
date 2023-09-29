import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CoreState } from "../states/core.state";

export const selectCore = createFeatureSelector<CoreState>("core");

export const selectLocalDatabase = createSelector(
   selectCore,
   state => state.database
);
