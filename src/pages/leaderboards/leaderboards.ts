import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { LeaderboardProvider } from "../../providers/leaderboard/leaderboard.provider";
import { Leaderboard } from "../../interfaces/leaderboard/leaderboard.interface";
import { StatsProvider } from "../../providers/stats/stats.provider";

@IonicPage()
@Component({
    selector: 'page-leaderboards',
    templateUrl: 'leaderboards.html',
})
export class LeaderboardsPage {

    private leaderboard = [] as Array<Leaderboard>;

    constructor( public navCtrl: NavController, public navParams: NavParams, private leaderboardProvider: LeaderboardProvider, private statsProvider: StatsProvider, private loadingCtrl : LoadingController) {
        this.getLeaderboard();
    }

    private async getLeaderboard() {
        let loader = this.loadingCtrl.create({
            content: 'Loading Top 100'
        });
        loader.present();
        this.leaderboard = await this.leaderboardProvider.getLeaderboards(1, 100);
        this.leaderboard.forEach(( leader: Leaderboard ) => {
            leader.kdaRatio = this.statsProvider.getKDARatio(leader.kills, leader.assists, leader.deaths);
            leader.winRate = this.statsProvider.getRatio(leader.wins, leader.gamesPlayed) * 100;
            leader.league = this.statsProvider.calculateLeague(leader.elo);
        });
        loader.dismiss();
    }

}
