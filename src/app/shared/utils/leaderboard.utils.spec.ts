import { LeaderboardElement } from "../models/LeaderboardElements";
import { LeaderboardUtils } from "./leaderboard.utils";

describe('LeaderboardUtils', () => {
   it('compares LeaderboardElements correctly', () => {
      const element1: LeaderboardElement = {
         gamemode: 'pvp',
         name: 'test',
         score: 100
      };
      const element2: LeaderboardElement = { ...element1 };
      expect(LeaderboardUtils.equals(element1, element2)).withContext('equal elements').toBeTrue();
      const element3: LeaderboardElement = { ...element2, score: 101 };
      expect(LeaderboardUtils.equals(element1, element3)).withContext('not equal elements').toBeFalse();
   });
});
