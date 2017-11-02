import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { PROFILE_POPUP_ACTION } from "../../static-models/profile-popup-actions/profile-popup-actions.static";

@IonicPage()
@Component({
    selector: 'page-profile-menu-popover',
    templateUrl: 'profile-menu-popover.html',
})
export class ProfileMenuPopoverPage {

    private options = PROFILE_POPUP_ACTION;

    constructor( public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController ) {
    }

    close() {
        this.viewCtrl.dismiss();
    }

    action( action: number ) {
        this.viewCtrl.dismiss({
            action : action
        });
    }

}