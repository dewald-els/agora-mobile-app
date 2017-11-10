import { Injectable } from "@angular/core";

@Injectable()
export class StatsProvider {

    public getWinRatio( wins: number, gamesPlayed: number, decimals?: number = 2 ) {
        return (wins / gamesPlayed * 100).toFixed(decimals);
    }

    public getKDARatio( kills: number, assists: number, deaths: number ) {
        return ((kills + assists) / deaths).toFixed(2);
    }

    public getPickRatio( gamesPlayed: number, totalGamesPlayed: number ) {
        return ((gamesPlayed / (totalGamesPlayed / 5)) * 100).toFixed(0);
    }

    public getRatio( ratio: number, of: number, decimal? = 2 ) {
        return (ratio / of).toFixed(decimal);
    }
}