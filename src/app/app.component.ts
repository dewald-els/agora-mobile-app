import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppProvider } from "../providers/app/app.provider";

@Component({
    templateUrl: 'app.html'
})
export class AgoraMobile {

    rootPage: string = 'SideMenuPage';

    constructor( private platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private appProvider: AppProvider ) {
        this.getDefaultStartPage();
        this.platform.ready().then(() => {
            statusBar.styleLightContent();
            splashScreen.hide();
        });
    }
    

    private getDefaultStartPage() {

        if ( this.appProvider.getFirstStartStatus() == false ) {
            this.rootPage = 'WelcomePage';
        }

        else {
            this.rootPage = 'SideMenuPage';
        }

    }


}

