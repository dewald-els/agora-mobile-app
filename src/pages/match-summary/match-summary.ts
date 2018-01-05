import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Match } from "../../interfaces/match/match.interface";
import { MatchTeamPlayer } from "../../interfaces/match/match-team-player.interface";
import { StatsProvider } from "../../providers/stats/stats.provider";
import { Hero } from "../../interfaces/hero/hero";
import { HeroProvider } from "../../providers/hero/hero.provider";
import { MatchTeamStats } from "../../interfaces/match/match-team-stats.interface";

@IonicPage()
@Component({
    selector: 'page-match-summary',
    templateUrl: 'match-summary.html',
})
export class MatchSummaryPage {

    private match = {} as Match;
    private heroes = [] as Hero[];

    constructor( public navCtrl: NavController, public navParams: NavParams, private statsProvider: StatsProvider, private heroProvider: HeroProvider, private loadingCtrl: LoadingController ) {
        this.match = <Match>this.navParams.get('match');
        this.match.teamStats = [];
        let loader = this.loadingCtrl.create({
            content: 'Getting match...'
        });
        loader.present();
        this.init();
        loader.dismiss();
    }

    private async init() {
        this.heroes = await this.heroProvider.getHeroes();
        for ( let i = 0; i < this.match.teams.length; i++ ) {

            this.setUpMatchTeamStats(i);
            this.match.teams[ i ].forEach(( player: MatchTeamPlayer ) => {

                player.heroData = this.heroes.find(( hero: Hero ) => {

                    // Bug where Drongo's code is empty.
                    if (hero.code === '' && hero.name == 'Drongo' && player.hero == 'HeroData_Shrapnel') {
                        return true;
                    }
                    // Bug where Terra's code is empty.
                    if (hero.code === '' && hero.name == 'Terra' && player.hero == 'HeroData_Justice') {
                        return true;
                    }

                    return player.hero === hero.code;
                });
                player.league = this.statsProvider.calculateLeague(player.elo);
                player.kdaRatio = this.statsProvider.getKDARatio(player.kills, player.assists, player.deaths);
                this.updateTeamMatchStats(i, player);

            });

            this.match.teamStats[ i ].elo = Math.floor(this.match.teamStats[ i ].elo / this.match.teams[ i ].length);
        }
    }

    private setUpMatchTeamStats( teamIndex ) {
        this.match.teamStats[ teamIndex ] = {} as MatchTeamStats;
        this.match.teamStats[ teamIndex ].elo = 0;
        this.match.teamStats[ teamIndex ].kills = 0;
        this.match.teamStats[ teamIndex ].assists = 0;
        this.match.teamStats[ teamIndex ].deaths = 0;
        this.match.teamStats[ teamIndex ].kdaRatio = 0;
        this.match.teamStats[ teamIndex ].heroDamage = 0;
        this.match.teamStats[ teamIndex ].towerDamage = 0;
        this.match.teamStats[ teamIndex ].minionDamage = 0;
        this.match.teamStats[ teamIndex ].jungleDamage = 0;
        this.match.teamStats[ teamIndex ].totalDamage = 0;
    }

    private updateTeamMatchStats( teamIndex: number, player: MatchTeamPlayer ) {
        this.match.teamStats[ teamIndex ].elo += player.elo;
        this.match.teamStats[ teamIndex ].kills += player.kills;
        this.match.teamStats[ teamIndex ].assists += player.assists;
        this.match.teamStats[ teamIndex ].deaths += player.deaths;
        this.match.teamStats[ teamIndex ].heroDamage += player.heroDamage;
        this.match.teamStats[ teamIndex ].towerDamage += player.towerDamage;
        this.match.teamStats[ teamIndex ].minionDamage += player.minionDamage;
        this.match.teamStats[ teamIndex ].jungleDamage += player.jungleDamage;
        this.match.teamStats[ teamIndex ].totalDamage += (player.heroDamage + player.towerDamage + player.minionDamage + player.jungleDamage);
    }

}
