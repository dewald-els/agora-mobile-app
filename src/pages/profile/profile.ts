import { Component, ViewChild } from "@angular/core";
import { AlertController, IonicPage, MenuController, NavController, PopoverController } from "ionic-angular";
import { ProfileMenuPopoverPage } from "../profile-menu-popover/profile-menu-popover";
import { PROFILE_POPUP_ACTION } from "../../static-models/profile-popup-actions/profile-popup-actions.static";
import { ProfileProvider } from "../../providers/profile/profile.provider";

@IonicPage()
@Component({
    selector: 'profile-page',
    templateUrl: 'profile.html'
})
export class ProfilePage {

    private profile: any;

    constructor( private navCtrl: NavController,
                 private popoverCtrl: PopoverController,
                 private profileProvider: ProfileProvider,
                 private alertCtrl: AlertController,
                 private menuCtrl : MenuController) {
        this.profile = this.profileProvider.getCachedProfile();
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
