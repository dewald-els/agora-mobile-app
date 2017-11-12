import { Injectable } from "@angular/core";

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
}