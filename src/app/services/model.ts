export enum Gamemode {
    vsAI = 0,
    challanges = 1,
}

export interface LeaderboardElement {
    gamemode: Gamemode;
    name: string;
    score: number;
}
