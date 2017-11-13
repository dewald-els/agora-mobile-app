import { MatchTeamPlayer } from "./match-team-player.interface";
import { MatchTeamStats } from "./match-team-stats.interface";

export interface Match {

    completed: boolean;
    createdAt: string;
    id: string;
    length: number;
    mode: number;
    winningTeam: number;
    teams: Array<Array<MatchTeamPlayer>>;
    player?: MatchTeamPlayer
    playerTeamIndex?: number;
    playerTeamKills? : number;
    teamStats? : Array<MatchTeamStats>;
}