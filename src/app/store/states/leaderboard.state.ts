import { LeaderboardElementWithId } from "@chess-models";
import { EntityState } from "@ngrx/entity";

export interface LeaderboardState extends EntityState<LeaderboardElementWithId> {
   isOfflineQueueHandled: boolean
}
