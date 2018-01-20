import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountLoginStatus } from "../../interfaces/account/account-login-status.interface";
import { ProfileProvider } from "../../providers/profile/profile.provider";
import { PlayerProfile } from "../../interfaces/player-profile/player-profile.model";
import { EpicAccountProvider } from "../../providers/epic/epic-account.provider";
import { AppProvider } from "../../providers/app/app.provider";

@IonicPage()
@Component({
    selector: 'page-welcome',
    templateUrl: 'welcome.html',
})
export class WelcomePage {
    private availableProfile = {} as PlayerProfile;

    constructor( public navCtrl: NavController, private alertCtrl: AlertController, private appProvider: AppProvider, private accountProvider: EpicAccountProvider, private profileProvider: ProfileProvider ) {
        this.appProvider.setFirstStartStatus();
        this.availableProfile = this.profileProvider.getCachedProfile();
    }

    navigateToTabsPage( event ) {
        this.navCtrl.setRoot('SideMenuPage', {}, {
            animate: true
        });
    }

    loginStatus( event: AccountLoginStatus ) {
        if ( event.result === false ) {
            this.alertCtrl.create({
                title: 'Login unsuccessful',
                subTitle: `That didn't work! \n${event.error.message}`,
                buttons: [ 'Ok' ]
            }).present();
        } else {
            this.accountProvider.saveAccountToCache(event.epicAccount);
            this.navCtrl.setRoot('SideMenuPage', {}, {
                animate: true
            });
        }

    }

}