import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
// Native
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
// Providers
import { AgoraMobile } from './app.component';
import { GemProvider } from '../providers/gem/gem.provider';
import { CardProvider } from '../providers/card/card.provider';
import { HeroProvider } from '../providers/hero/hero.provider';
import { ProfileProvider } from '../providers/profile/profile.provider';
import { AgoraCacheProvider } from '../providers/agora-cache/agora-cache.provider';
import { HttpModule } from "@angular/http";

@NgModule({
    declarations: [
        AgoraMobile
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(AgoraMobile),
        HttpModule
    ],
    bootstrap: [ IonicApp ],
    entryComponents: [
        AgoraMobile
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        GemProvider,
        CardProvider,
        HeroProvider,
        ProfileProvider,
        AgoraCacheProvider
    ]
})
export class AppModule {
}
