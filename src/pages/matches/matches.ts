import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Hero} from "../../interfaces/hero/hero";
import {HeroProvider} from "../../providers/hero/hero.provider";
import {PlayerProfile} from "../../interfaces/player-profile/player-profile.model";
import {MatchProvider} from "../../providers/match/match.provider";
import {EpicAccount} from "../../interfaces/account/epic-account.interface";
import {EpicAccountProvider} from "../../providers/epic/epic-account.provider";
import {Match} from "../../interfaces/match/match.interface";
import {MatchTeamPlayer} from "../../interfaces/match/match-team-player.interface";
import {StatsProvider} from "../../providers/stats/stats.provider";
import {ProfileProvider} from "../../providers/profile/profile.provider";

@IonicPage()
@Component({
    selector: 'page-matches',
    templateUrl: 'matches.html',
})
export class MatchesPage {

    private account: EpicAccount;
    private profile = {} as PlayerProfile;
    private matches = [] as Match[];
    private filteredMatches = [] as Match[];
    private heroes = [] as Hero[];
    private loader: any;
    private filterMatchesByHero: string = 'all';

    constructor(public navCtrl: NavController,
                private accountProvider: EpicAccountProvider,
                private profileProvider: ProfileProvider,
                private heroProvider: HeroProvider,
                private loadingCtrl: LoadingController,
                private matchProvider: MatchProvider,
                private statsProvider: StatsProvider) {

        this.account = this.accountProvider.getCachedAccount();
        this.loader = this.loadingCtrl.create({
            content: 'Loading your matches...'
        });
        this.loader.present();

        this.init();
    }

    private async init() {
        this.profile = new PlayerProfile(await this.profileProvider.getProfile(this.account.playerId));
        this.heroes = await this.heroProvider.getHeroes();
        this.matches = await this.matchProvider.getPlayerMatches(this.account.playerId);
        this.loadPlayerMatches();
        this.loader.dismiss();
    }

    private loadPlayerMatches() {
        this.matches.forEach((match: Match) => {

            let playerIndex = 0;

            match.teams[0].forEach((player: MatchTeamPlayer) => {
                if (player.id === this.account.playerId) {
                    match.player = player;
                    match.playerTeamIndex = 0;
                    match.playerIndex = playerIndex;
                }
                playerIndex++;
            });

            playerIndex = 0;

            match.teams[1].forEach((player: MatchTeamPlayer) => {

                if (player.id === this.account.playerId) {
                    match.player = player;
                    match.playerTeamIndex = 1;
                    match.playerIndex = playerIndex;
                }
                playerIndex++;
            });
            match.playerTeamKills = 0;
            match.teams[match.playerTeamIndex].forEach((player: MatchTeamPlayer) => {
                match.playerTeamKills += player.kills;
            });
            match.player.kdaRatio = this.statsProvider.getKDARatio(match.player.kills, match.player.assists, match.player.deaths);
            match.player.killParticipation = this.statsProvider.getRatio(match.player.kills + match.player.assists, match.playerTeamKills) * 100;
        });

        this.calculateEloChange();
        this.filteredMatches = this.matches;
    }

    applyHeroFilter() {
        if (this.filterMatchesByHero === 'all') {
            this.filteredMatches = this.matches;
        } else {
            this.filteredMatches = this.matches.filter((match: Match) => {
                return match.player.hero === this.filterMatchesByHero;
            });
        }
    }

    clearHeroFilter() {
        this.filterMatchesByHero = 'all';
    }

    goToMatchSummary(match: Match) {
        this.navCtrl.push('MatchSummaryPage', {
            match: match
        });
    }

    calculateEloChange() {
        for (let i = 0; i < this.matches.length; i++) {

            if (i == this.matches.length - 1) {
                // Last match
                this.matches[i].eloChange = this.profile.getElo() - this.matches[i].teams[this.matches[i].playerTeamIndex][this.matches[i].playerIndex].elo;
            }
            else {

                //this.matches[i].eloChange = this.matches[i].teams[this.matches[i].playerTeamIndex][this.matches[i].playerIndex].elo - this.matches[i + 1].teams[this.matches[i+1].playerTeamIndex][this.matches[i+1].playerIndex].elo;

                this.matches[i].eloChange = Math.abs(this.matches[i].teams[this.matches[i].playerTeamIndex][this.matches[i].playerIndex].elo - this.matches[i+1].teams[this.matches[i+1].playerTeamIndex][this.matches[i+1].playerIndex].elo);

            }

        }
    }
}
