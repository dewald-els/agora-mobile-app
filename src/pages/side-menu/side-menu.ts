import { Component, ViewChild } from "@angular/core";
import { AlertController, IonicPage, MenuController, Nav } from "ionic-angular";
import { ProfileProvider } from "../../providers/profile/profile.provider";
import { AccountLoginStatus } from "../../interfaces/account/account-login-status.interface";
import { SideMenuProvider } from "../../providers/side-menu/side-menu.provider";

@IonicPage()
@Component({
    selector: 'side-menu-page',
    templateUrl: './side-menu.html'
})
export class SideMenuPage {

    @ViewChild(Nav) nav: Nav;

    rootPage: string = 'LeaderboardsPage';

    private menus = [];
    private profile: any = false;

    constructor( private profileProvider: ProfileProvider, private alertCtrl: AlertController, private menuCtrl: MenuController, private sideMenuProvider: SideMenuProvider ) {

    }

    ionViewWillEnter() {

        this.menus = this.sideMenuProvider.getAvailableMenus();

        console.log(this.menus);

        this.profile = this.profileProvider.getCachedProfile();

        if ( !this.profile ) {
            this.rootPage = 'LeaderboardsPage';
        } else {
            this.rootPage = 'ProfilePage';
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

            this.profileProvider.saveToCache(event.account);
            this.profile = event.account;

            this.menus = this.sideMenuProvider.getAvailableMenus();

            console.log(this.menus);

            this.nav.setRoot('ProfilePage');
            this.menuCtrl.close('menu');
        }
    }

    signOut(event) {

        this.profileProvider.logout();
        this.profile = false;
        this.menus = this.sideMenuProvider.getAvailableMenus();

        this.nav.setRoot('LeaderboardsPage');
        this.menuCtrl.close();
    }

    skipLogin( event ) {
        return true;
    }
}