import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountLoginStatus } from "../../interfaces/account/account-login-status.interface";
import { AgoraCacheProvider } from "../../providers/agora-cache/agora-cache.provider";

@IonicPage()
@Component({
    selector: 'page-welcome',
    templateUrl: 'welcome.html',
})
export class WelcomePage {

    constructor( public navCtrl: NavController, private alertCtrl: AlertController, private agoraCacheProvider: AgoraCacheProvider) {
        this.agoraCacheProvider.saveToCache('is-first-start', new Date().getTime().toString());
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