export interface PvpStats {
    assists_core: number;
    assists_hero: number;
    assists_inhibitor: number;
    assists_minions: number;
    assists_towers: number;
    damage_done_hero: number;
    damage_done_minons: number;
    damage_done_structures: number;
    deaths_hero: number;
    deaths_minions: number;
    deaths_towers: number;
    games_left: number;
    games_played: number;
    games_won: number;
    kills_core: number;
    kills_hero: number;
    kills_inhibitors: number;
    kills_minions: number;
    kills_towers: number;
    surrender_voted_no: number;
    surrender_voted_yes: number;
    surrender_votes_abstained: number;
    surrender_votes_participated: number;
    surrender_votes_started: number;
    time_played: number;

    winRatio?: number;
    kdaRatio?: number;
    heroDamagePerGame?: number;
    structureDmgPerGame?: number;
    minionDmgPerGame?: number;
    heroKillsPerGame?: number;
    minionKillsPerGame?: number;
    structureKillsPerGame?: number;
}