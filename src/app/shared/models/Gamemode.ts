export const Gamemodes = ["pvp", "pve", "eve"] as const;

export type Gamemode = (typeof Gamemodes)[number];
