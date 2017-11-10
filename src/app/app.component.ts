import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
    templateUrl: 'app.html'
})
export class AgoraMobile {

    rootPage: string = 'WelcomePage';

    constructor( private platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

        this.platform.ready().then(() => {
            statusBar.styleLightContent();
            splashScreen.hide();
        });
    }





}

