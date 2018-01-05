import { Hero } from "../hero/hero";

export interface MatchTeamPlayer {

    assists: number;
    deaths: number;
    donationBadgeEnabled: any;
    donationTier: number;
    elo: number;
    hero: string;
    heroAssists: number;
    heroDamage: number;
    heroDeaths: number;
    heroGamesPlayed: number;
    heroKills: number;
    heroWins: number;
    id: string;
    jungleDamage: number;
    kills: number;
    lastSeasonElo: number;
    level: number;
    minionDamage: number;
    mode: number;
    name: string;
    rigDamage: number;
    team: number;
    totalAssists: number;
    totalDeaths: number;
    totalElo: number;
    totalGamesPlayed: number;
    totalKills: number;
    totalTowers: number;
    totalWins: number;
    towerDamage: number;
    towers: number;

    heroData?: Hero;
    kdaRatio?: number;
    killParticipation?: number;
    league?: string;

}