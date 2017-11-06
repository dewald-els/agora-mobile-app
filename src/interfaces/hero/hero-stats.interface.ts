import { Hero } from "./hero";

export interface HeroStats {
    assists: number;
    deaths: number;
    elo: string;
    gamesPlayed: number;
    hero: string;
    kills: number;
    wins: number;
    heroData?: Hero;
    winRate? : number;
    pickRate? : number;
    kdaRate? : number;
}