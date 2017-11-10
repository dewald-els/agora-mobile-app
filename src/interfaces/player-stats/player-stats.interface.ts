import { HeroStats } from "../hero/hero-stats.interface";

export interface PlayerStats {
    mode: number;
    gamesPlayed: number;
    elo: number;
    wins: number;
    kills: number;
    deaths: number;
    assists: number;
    towers: number;
    rank: number;
    percentile: number;
    heroes: Array<HeroStats>;
}