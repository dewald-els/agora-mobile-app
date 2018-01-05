import { Component, ViewChild } from "@angular/core";
import { IonicPage, LoadingController, NavController, PopoverController } from "ionic-angular";
import { PROFILE_POPUP_ACTION } from "../../static-models/profile-popup-actions/profile-popup-actions.static";
import { EpicAccountProvider } from "../../providers/epic/epic-account.provider";
import { EpicAccount } from "../../interfaces/account/epic-account.interface";
import { ProfileProvider } from "../../providers/profile/profile.provider";
import { PlayerProfile } from "../../interfaces/player-profile/player-profile.model";
import { LEAGUES } from "../../static-models/leagues/leagues.static";
import { League } from "../../interfaces/league/league.interface";
import { Hero } from "../../interfaces/hero/hero";
import { HeroProvider } from "../../providers/hero/hero.provider";
import { PlayerStats } from "../../interfaces/player-stats/player-stats.interface";
import { HeroStats } from "../../interfaces/hero/hero-stats.interface";
import { LifetimeStats } from "../../interfaces/player-stats/lifetime-stats.interface";
import { StatsProvider } from "../../providers/stats/stats.provider";

@IonicPage()
@Component({
    selector: 'profile-page',
    templateUrl: 'profile.html'
})
export class ProfilePage {

    private epicAccount = {} as EpicAccount;
    private profile: PlayerProfile;
    private pvpStats = {} as PlayerStats;
    private lifetimeStats = null as LifetimeStats;

    private leagues = LEAGUES;
    private currentLeague = {} as League;
    private profileElo = [];
    private fetchingLifetimestats: boolean = false;

    constructor( private navCtrl: NavController,
                 private popoverCtrl: PopoverController,
                 private accountProvider: EpicAccountProvider,
                 private profileProvider: ProfileProvider,
                 private heroProvider: HeroProvider,
                 private loadingCtrl: LoadingController,
                 private statsProvider: StatsProvider ) {

        this.epicAccount = this.accountProvider.getCachedAccount();

    }

    private async getPlayerProfile() {
        let profile = await this.profileProvider.getProfile(this.epicAccount.playerId);
        if ( profile ) {
            this.profile = new PlayerProfile(profile);
            this.profileElo = this.profile.getElo().toString().split('.');
            this.profileElo[ 1 ] = this.profileElo[ 1 ].substr(0, 2);
            this.currentLeague = this.leagues[ this.profile.calculateProfileLeague() ];
            this.pvpStats = this.profile.stats[ 0 ];
            this.pvpStats.percentile = Number(this.pvpStats.percentile.toFixed(2));

            console.log(this.pvpStats.heroes);
            this.pvpStats.heroes.forEach(( stat: HeroStats ) => {
                stat.winRate = Math.round(Number(this.statsProvider.getWinRatio(stat.wins, stat.gamesPlayed)));
                stat.kdaRate = Number(this.statsProvider.getKDARatio(stat.kills, stat.assists, stat.deaths));
            });
            this.pvpStats.heroes = this.heroProvider.sortBy('picks', this.pvpStats.heroes);
        }
    }

    ionViewDidLoad() {
        this.getPlayerProfile();
    }

    async loadLifetimeStats() {
        this.fetchingLifetimestats = true;
        this.lifetimeStats = await this.profileProvider.getLifetimeStats(this.profile.accountGuid);
        this.lifetimeStats.pvp.kdaRatio = this.statsProvider.getKDARatio(this.lifetimeStats.pvp.kills_hero, this.lifetimeStats.pvp.assists_hero, this.lifetimeStats.pvp.deaths_hero);
        this.lifetimeStats.pvp.winRatio = this.statsProvider.getWinRatio(this.lifetimeStats.pvp.games_won, this.lifetimeStats.pvp.games_played);
        this.lifetimeStats.pvp.heroDamagePerGame = this.statsProvider.getRatio(this.lifetimeStats.pvp.damage_done_hero, this.lifetimeStats.pvp.games_played);
        this.lifetimeStats.pvp.minionDmgPerGame = this.statsProvider.getRatio(this.lifetimeStats.pvp.damage_done_minons, this.lifetimeStats.pvp.games_played);
        this.lifetimeStats.pvp.minionKillsPerGame = this.statsProvider.getRatio(this.lifetimeStats.pvp.kills_minions, this.lifetimeStats.pvp.games_played);
        this.lifetimeStats.pvp.structureDmgPerGame = this.statsProvider.getRatio(this.lifetimeStats.pvp.damage_done_structures, this.lifetimeStats.pvp.games_played);
        this.lifetimeStats.pvp.structureKillsPerGame = this.statsProvider.getRatio(
            this.lifetimeStats.pvp.kills_towers + this.lifetimeStats.pvp.kills_inhibitors + this.lifetimeStats.pvp.kills_core,
            this.lifetimeStats.pvp.games_played);

        this.fetchingLifetimestats = false;
    
    }

    showProfileMenu( event ) {
        let popover = this.popoverCtrl.create('ProfileMenuPopoverPage');

        popover.onDidDismiss(( data: string ) => {

            if ( data ) {
                switch ( data[ 'action' ] ) {

                    case PROFILE_POPUP_ACTION.ACCOUNT : {

                        // Go to account settings.

                    }
                        break;

                    default : {
                        return false;
                    }
                }
            }


        });
        popover.present({
            ev: event
        });
    }
}
