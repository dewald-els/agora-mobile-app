import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountLoginStatus } from "../../interfaces/account/account-login-status.interface";
import { AgoraCacheProvider } from "../../providers/agora-cache/agora-cache.provider";
import { ProfileProvider } from "../../providers/profile/profile.provider";
import { PlayerProfile } from "../../interfaces/player-profile/player-profile.model";

@IonicPage()
@Component({
    selector: 'page-welcome',
    templateUrl: 'welcome.html',
})
export class WelcomePage {

    private availableProfile = {} as PlayerProfile;

    constructor( public navCtrl: NavController, private alertCtrl: AlertController, private agoraCacheProvider: AgoraCacheProvider, private profileProvider : ProfileProvider) {
        this.agoraCacheProvider.saveToCache('is-first-start', new Date().getTime().toString());
        this.availableProfile = this.profileProvider.getCachedProfile();
        console.log(this.availableProfile);

    }

    navigateToTabsPage( event ) {
        this.navCtrl.setRoot('SideMenuPage', {}, {
            animate: true
        });
    }

    loginStatus(event : AccountLoginStatus){

        if (event.result === false) {

            this.alertCtrl.create({
                title:'Login unsuccessful',
                subTitle: `That didn't work! \n${event.error.message}`,
                buttons: ['Ok']
            }).present();

        } else {
            this.agoraCacheProvider.saveToCache('profile', event.account);
            this.navCtrl.setRoot('SideMenuPage', {}, {
                animate: true
            });
        }
    }
}