import { Gamemode } from "../Gamemode";

export interface LeaderboardElement {
   gamemode: Gamemode;
   name: string;
   score: number;
}

export interface LeaderboardElementWithId extends LeaderboardElement {
   id: number;
}
