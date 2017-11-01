import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-profile-menu-popover',
    templateUrl: 'profile-menu-popover.html',
})
export class ProfileMenuPopoverPage {

    constructor( public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ProfileMenuPopoverPage');
    }

    close() {
        this.viewCtrl.dismiss();
    }
}