export const Gamemode = {
   vsAI: 0,
   challenges: 1,
} as const;
export type Gamemode = (typeof Gamemode)[keyof typeof Gamemode];

export interface LeaderboardElement {
   gamemode: Gamemode;
   name: string;
   score: number;
}

/*export interface LeaderboardElementWithId extends LeaderboardElement {
   id: number;
}*/
export type LeaderboardElementWithId = LeaderboardElement & { id: number };


export interface User {
   id: string;
   name: string;
}
