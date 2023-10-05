import { createReducer, on } from "@ngrx/store";
import { initActions } from "../actions/init.actions";
import { CoreState } from "../states/core.state";

const initialState: CoreState = {
   database: undefined
};

export const coreReducer = createReducer(
   initialState,
   on(initActions.localDatabaseOpened, (state, { database }) => ({
      ...state,
      database
   }))
);
