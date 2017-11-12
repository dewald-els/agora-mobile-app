import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Hero } from "../../interfaces/hero/hero";
import { HeroProvider } from "../../providers/hero/hero.provider";
import { PlayerProfile } from "../../interfaces/player-profile/player-profile.model";
import { MatchProvider } from "../../providers/match/match.provider";
import { EpicAccount } from "../../interfaces/account/epic-account.interface";
import { EpicAccountProvider } from "../../providers/epic/epic-account.provider";
import { Match } from "../../interfaces/match/match.interface";
import { MatchTeamPlayer } from "../../interfaces/match/match-team-player.interface";
import { StatsProvider } from "../../providers/stats/stats.provider";

@IonicPage()
@Component({
    selector: 'page-matches',
    templateUrl: 'matches.html',
})
export class MatchesPage {

    private account: EpicAccount;
    private matches = [] as Match[];
    private filteredMatches = [] as Match[];
    private heroes = [] as Hero[];
    private loader: any;
    private filterMatchesByHero: string = 'all';

    constructor( public navCtrl: NavController,
                 private accountProvider: EpicAccountProvider,
                 private heroProvider: HeroProvider,
                 private loadingCtrl: LoadingController,
                 private matchProvider: MatchProvider,
                 private statsProvider: StatsProvider ) {

        this.account = this.accountProvider.getCachedAccount();

        this.loader = this.loadingCtrl.create({
            content: 'Loading your matches...'
        });

        this.loader.present();

        this.heroes = this.heroProvider.getCachedHeroes();

        if ( !this.heroes ) {
            this.getAllHeroes();
        }

        this.getPlayerMatches();

        /**
         * Give the Pipes a second to complete.
         */
        setTimeout(() => {
            this.loader.dismiss();
        }, 1000);

    }

    private async getAllHeroes() {
        this.heroes = await this.heroProvider.getHeroes();
    }

    private async getPlayerMatches() {
        this.matches = await this.matchProvider.getPlayerMatches(this.account.playerId);

        this.matches.forEach(( match: Match ) => {

            match.teams[ 0 ].forEach(( player: MatchTeamPlayer ) => {
                if ( player.id === this.account.playerId ) {
                    match.player = player;
                    match.playerTeamIndex = 0;
                }
            });

            match.teams[ 1 ].forEach(( player: MatchTeamPlayer ) => {

                if ( player.id === this.account.playerId ) {
                    match.player = player;
                    match.playerTeamIndex = 1;
                }
            });

            match.playerTeamKills = 0;

            match.teams[ match.playerTeamIndex ].forEach(( player: MatchTeamPlayer ) => {
                match.playerTeamKills += player.kills;
            });

            match.player.kdaRatio = this.statsProvider.getKDARatio(match.player.kills, match.player.assists, match.player.deaths);
            match.player.killParticipation = this.statsProvider.getRatio(match.player.kills + match.player.assists, match.playerTeamKills) * 100;
        });


        this.filteredMatches = this.matches;
    }

    private setMatchResults() {


    }

    applyHeroFilter() {
        if ( this.filterMatchesByHero === 'all' ) {
            this.filteredMatches = this.matches;
        } else {
            this.filteredMatches = this.matches.filter(( match: Match ) => {
                return match.player.hero === this.filterMatchesByHero;
            });
        }
    }

    clearHeroFilter() {
        this.filterMatchesByHero = 'all';
    }
}
