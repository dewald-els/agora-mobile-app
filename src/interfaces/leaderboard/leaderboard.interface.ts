export interface Leaderboard {
    account: {
        twitchHandle: string,
        playerName: string,
        donationTier: number
    };
    donationTier: number;
    playerName: string;
    twitchHandle: string;
    assists: number;
    deaths: number;
    elo: number;
    gamesPlayed: number;
    hero1: string;
    hero2: string;
    hero3: string;
    kills: number;
    mode: number;
    player: {
        name: string
    };
    name: "Aphostle"
    playerId: number;
    season: number;
    wins: number;


    kdaRatio?: number;
    winRate?: number;
    league?: string;
}