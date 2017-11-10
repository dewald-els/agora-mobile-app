import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Hero } from "../../interfaces/hero/hero";
import { HeroProvider } from "../../providers/hero/hero.provider";
import { PlayerProfile } from "../../interfaces/player-profile/player-profile.model";
import { MatchProvider } from "../../providers/match/match.provider";
import { EpicAccount } from "../../interfaces/account/epic-account.interface";
import { EpicAccountProvider } from "../../providers/epic/epic-account.provider";
import { Match } from "../../interfaces/match/match.interface";


@IonicPage()
@Component({
    selector: 'page-matches',
    templateUrl: 'matches.html',
})
export class MatchesPage {

    private account: EpicAccount;
    private matches = [];
    private heroes = [] as Hero[];
    private loader: any;
    private filterMatchesByHero: string = 'all';

    constructor( public navCtrl: NavController, public navParams: NavParams, private accountProvider: EpicAccountProvider, private heroProvider: HeroProvider, private loadingCtrl: LoadingController, private matchProvider: MatchProvider ) {

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

        this.loader.dismiss();
    }

    private async getAllHeroes() {
        this.heroes = await this.heroProvider.getHeroes();
    }

    private async getPlayerMatches() {
        this.matches = await this.matchProvider.getPlayerMatches(this.account.playerId);
    }

}
