import { Component, ViewChild } from "@angular/core";
import { IonicPage, LoadingController, NavController, PopoverController } from "ionic-angular";
import { PROFILE_POPUP_ACTION } from "../../static-models/profile-popup-actions/profile-popup-actions.static";
import { AccountProvider } from "../../providers/account/account.provider";
import { EpicAccount } from "../../interfaces/account/epic-account.interface";
import { ProfileProvider } from "../../providers/profile/profile.provider";
import { PlayerProfile } from "../../interfaces/player-profile/player-profile.model";
import { LEAGUES } from "../../static-models/leagues/leagues.static";
import { League } from "../../interfaces/league/league.interface";
import { Hero } from "../../interfaces/hero/hero";
import { HeroProvider } from "../../providers/hero/hero.provider";

@IonicPage()
@Component({
    selector: 'profile-page',
    templateUrl: 'profile.html'
})
export class ProfilePage {

    private account: EpicAccount;
    private profile: PlayerProfile;
    private leagues = LEAGUES;
    private currentLeague = {} as League;
    private loader;
    private heroes = [] as Hero[];
    private filterMatchesByHero : string = 'all';

    constructor( private navCtrl: NavController,
                 private popoverCtrl: PopoverController,
                 private accountProvider: AccountProvider,
                 private profileProvider: ProfileProvider,
                 private heroProvider : HeroProvider,
                 private loadingCtrl : LoadingController) {

        this.account = this.accountProvider.getCachedProfile();
        this.heroes = this.heroProvider.getCachedHeroes();
        this.getPlayerProfile();
    }

    async getPlayerProfile() {
        this.loader = this.loadingCtrl.create({
            content: 'Loading your profile...'
        });
        this.loader.present();
        let profile = await this.profileProvider.getProfile(this.account.playerId);
        this.profile = new PlayerProfile(profile);
        this.currentLeague = this.leagues[ this.profile.calculateProfileLeague() ];
        console.log(this.profile);
        this.loader.dismiss();
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
