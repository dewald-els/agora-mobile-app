import { Component, ViewChild } from "@angular/core";
import { AlertController, IonicPage, MenuController, Nav } from "ionic-angular";
import { AccountLoginStatus } from "../../interfaces/account/account-login-status.interface";
import { SideMenuProvider } from "../../providers/side-menu/side-menu.provider";
import { EpicAccountProvider } from "../../providers/epic/epic-account.provider";
import { EpicAccount } from "../../interfaces/account/epic-account.interface";

@IonicPage()
@Component({
    selector: 'side-menu-page',
    templateUrl: './side-menu.html'
})
export class SideMenuPage {

    @ViewChild(Nav) nav: Nav;

    rootPage: string = '';

    private menus = [];
    private epicAccount = {} as EpicAccount;

    constructor( private alertCtrl: AlertController,
                 private menuCtrl: MenuController,
                 private sideMenuProvider: SideMenuProvider,
                 private accountProvider: EpicAccountProvider ) {

        this.menus = this.sideMenuProvider.getAvailableMenus();

    }

    ionViewDidLoad() {
        this.checkForActiveLogin();
    }

    checkForActiveLogin() {
        this.epicAccount = this.accountProvider.getCachedAccount();

        if ( this.epicAccount ) {
            console.log(this.epicAccount);
            this.rootPage = 'ProfilePage'
        } else {
            this.rootPage = 'LeaderboardsPage';
        }

    }


    openPage( page: string ) {
        this.nav.setRoot(page);
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
            this.epicAccount = event.epicAccount;

            this.nav.setRoot('ProfilePage');
            this.menuCtrl.close('menu');
        }
    }

    signOut( event ) {

        this.accountProvider.logout();
        this.epicAccount = null;

        this.nav.setRoot('LeaderboardsPage');
        this.menuCtrl.close();
    }

    skipLogin( event ) {
        return true;
    }
}
