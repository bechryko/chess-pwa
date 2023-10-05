import { EntityState } from "@ngrx/entity";
import { LeaderboardElementWithId } from "src/app/shared/models/LeaderboardElements";

export interface LeaderboardState extends EntityState<LeaderboardElementWithId> {
   isOfflineQueueHandled: boolean
}
