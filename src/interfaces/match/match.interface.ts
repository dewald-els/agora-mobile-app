import { MatchTeamPlayer } from "./match-team-player.interface";

export interface Match{

    completed: boolean;
    createdAt: string;
    id: string;
    length: number;
    mode: number;
    winningTeam: number;
    teams: Array<Array<MatchTeamPlayer>>;
}