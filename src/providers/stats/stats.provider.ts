import { Injectable } from "@angular/core";
import { LEAGUE } from "../../static-models/leagues/leagues.static";

@Injectable()
export class StatsProvider {

    public getWinRatio( wins: number, gamesPlayed: number ) {
        return (wins / gamesPlayed * 100);
    }

    public getKDARatio( kills: number, assists: number, deaths: number ) {

        if ( deaths == 0 ) deaths = 1;

        return ((kills + assists) / deaths);
    }

    public getPickRatio( gamesPlayed: number, totalGamesPlayed: number ) {
        return ((gamesPlayed / (totalGamesPlayed / 5)) * 100);
    }

    public getRatio( ratio: number, of: number ) {
        return (ratio / of);
    }

    public calculateLeague( elo: number )  {
        if ( elo <= 1099 ) {
            return 'bronze';
        } else if ( elo >= 1100 && elo <= 1299 ) {
            return 'silver';
        } else if ( elo >= 1300 && elo <= 1499 ) {
            return 'gold';
        } else if ( elo >= 1500 && elo <= 1699 ) {
            return 'platinum';
        } else if ( elo >= 1700 && elo < 2200 ) {
            return 'diamond';
        } else if ( elo >= 2200 ) {
            return 'master';
        } else {
            return '';
        }
    }
}