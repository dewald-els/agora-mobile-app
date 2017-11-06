import { Component, ViewChild } from "@angular/core";
import { AlertController, IonicPage, MenuController, NavController, PopoverController } from "ionic-angular";
import { ProfileMenuPopoverPage } from "../profile-menu-popover/profile-menu-popover";
import { PROFILE_POPUP_ACTION } from "../../static-models/profile-popup-actions/profile-popup-actions.static";
import { AccountProvider } from "../../providers/account/account.provider";
import { EpicAccount } from "../../interfaces/account/epic-account.interface";
import { ProfileProvider } from "../../providers/profile/profile.provider";
import { PlayerProfile } from "../../interfaces/player-profile/player-profile.model";
import { LEAGUES } from "../../static-models/leagues/leagues.static";
import { League } from "../../interfaces/league/league.interface";

@IonicPage()
@Component({
    selector: 'profile-page',
    templateUrl: 'profile.html'
})
export class ProfilePage {

    private account: EpicAccount;
    private profile: PlayerProfile;
    private leagues = LEAGUES;
    private currentLeague: League;

    constructor( private navCtrl: NavController,
                 private popoverCtrl: PopoverController,
                 private accountProvider: AccountProvider,
                 private profileProvider: ProfileProvider ) {

        this.account = this.accountProvider.getCachedProfile();
        this.getPlayerProfile();

    }

    async getPlayerProfile() {
        let profile = await this.profileProvider.getProfile(this.account.playerId);
        this.profile = new PlayerProfile(profile);
        this.currentLeague = this.leagues[ this.profile.calculateProfileLeague() ];

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
