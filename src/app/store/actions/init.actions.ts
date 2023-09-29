import { createActionGroup, props } from "@ngrx/store";

export const initActions = createActionGroup({
   source: "App Initialization",
   events: {
      "Local Database Opened": props<{ database: IDBDatabase }>()
   }
});
