export enum Gamemode {
   vsAI = 0,
   challanges = 1,
}

export interface LeaderboardElement {
   gamemode: Gamemode;
   name: string;
   score: number;
}

export interface LeaderboardElementWithId extends LeaderboardElement {
   id: number;
}

export interface User {
   id: string;
   name: string;
}
