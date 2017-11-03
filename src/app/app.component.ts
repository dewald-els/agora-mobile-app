import { Component } from '@angular/core';
import { LoadingController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AccountProvider } from "../providers/account/account.provider";
import { EpicAccountProvider } from "../providers/epic/epic-account.provider";
import { InAppBrowser, InAppBrowserEvent } from "@ionic-native/in-app-browser";
import { AccountLoginStatus } from "../interfaces/account/account-login-status.interface";

@Component({
    templateUrl: 'app.html'
})
export class AgoraMobile {

    rootPage: string = 'WelcomePage';

    private loader;

    constructor( private platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
                 private accountProvider: AccountProvider,
                 private epicAccountProvider: EpicAccountProvider,
                 private inAppBrowser: InAppBrowser,
                 private loadingCtrl: LoadingController ) {

        console.log(this.accountProvider.isFirstStart());

        console.log(this.accountProvider.getCachedProfile() === false);

        if ( this.accountProvider.isFirstStart() === true && this.accountProvider.getCachedProfile() === false ) {
            this.rootPage = 'WelcomePage';
        }

        else if ( this.accountProvider.isFirstStart() && this.accountProvider.getCachedProfile() === false ) {
            this.rootPage = 'SideMenuPage';
        }

        else if ( this.accountProvider.getCachedProfile() !== false ) {
            this.autoLoginAttempt();
        }

        this.platform.ready().then(() => {
            statusBar.styleLightContent();
            splashScreen.hide();
        });
    }

    private autoLoginAttempt() {

        this.platform.ready().then(() => {
            this.loader = this.loadingCtrl.create({
                content: 'Loading your Epic account...'
            });

            this.loader.present();

            let browserLogin = this.inAppBrowser.create(this.epicAccountProvider.getLoginUrl(), '_blank', {
                zoom: 'no',
                location: 'no',
                hidden: 'yes',
                closeButtonCaption: 'Cancel'
            });


            browserLogin.on('loadstart').subscribe(( event: InAppBrowserEvent ) => {
                // Successful login.
                if ( event.url.indexOf('?code=') > -1 ) {
                    let url = new URL(event.url);
                    let code = url.searchParams.get("code");
                    browserLogin.close();
                    this.authorizeLogin(code);
                }
            });
        });

    }

    private async authorizeLogin( code ) {

        let response = await <AccountLoginStatus>this.epicAccountProvider.authorizeLogin(code);

        if ( response.result === true ) {
            this.rootPage = 'SideMenuPage';
        }
        this.loader.dismiss();
    }

}

