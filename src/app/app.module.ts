import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {AgoraMobile} from './app.component';

@NgModule({
    declarations: [
        AgoraMobile
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(AgoraMobile)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        AgoraMobile
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}
