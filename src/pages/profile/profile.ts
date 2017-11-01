import { Component } from "@angular/core";
import { IonicPage, PopoverController } from "ionic-angular";
import { ProfileMenuPopoverPage } from "../profile-menu-popover/profile-menu-popover";


@IonicPage()
@Component({
    selector: 'profile-page',
    templateUrl: 'profile.html'
})
export class ProfilePage {

    constructor( private popoverCtrl: PopoverController ) {
    }

    showProfileMenu( event ) {

        let popover = this.popoverCtrl.create('ProfileMenuPopoverPage');
        popover.present({
            ev: event
        });
    }
}