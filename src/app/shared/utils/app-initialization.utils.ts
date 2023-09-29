import { Store } from "@ngrx/store";
import { initActions } from "src/app/store/actions/init.actions";
import { DatabaseInfoUtils } from "./database-info.utils";

export class AppInitializationUtils {
   public static openDatabase(store: Store): Promise<void> {
      return new Promise<void>((resolve, reject) => {
         const request = indexedDB.open(DatabaseInfoUtils.LOCAL_OBJECT_STORE_NAME + '-db', DatabaseInfoUtils.LOCAL_OBJECT_STORE_VERSION);
         request.onerror = (event: any) => {
            reject(event.error); //TODO: display db error message for users
         };
         request.onupgradeneeded = (event: any) => {
            this.createObjectStore(event.target.result as IDBDatabase);
            store.dispatch(initActions.localDatabaseOpened({ database: event.target.result as IDBDatabase }));
            resolve();
         };
         request.onsuccess = (event: any) => {
            store.dispatch(initActions.localDatabaseOpened({ database: event.target.result as IDBDatabase }));
            resolve();
         };
      });
   }

   private static createObjectStore(database: IDBDatabase): void {
      const objectStore = database.createObjectStore(DatabaseInfoUtils.LOCAL_OBJECT_STORE_NAME, {
         keyPath: 'id',
         autoIncrement: true,
      });
      objectStore.createIndex('gamemode', 'gamemode', { unique: false });
      objectStore.createIndex('name', 'name', { unique: false });
      objectStore.createIndex('score', 'score', { unique: false });
   }
}
