import { LeaderboardElement } from "../models/LeaderboardElements";

export class LeaderboardUtils {
   public static equals(entry1: LeaderboardElement, entry2: LeaderboardElement): boolean {
      return entry1.gamemode === entry2.gamemode
         && entry1.name === entry2.name
         && entry1.score === entry2.score;
   }
}
