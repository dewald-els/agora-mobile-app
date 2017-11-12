import { Component, EventEmitter, Input, Output } from "@angular/core";
import { EpicAccountProvider } from "../../providers/epic/epic-account.provider";
import { InAppBrowser, InAppBrowserEvent } from "@ionic-native/in-app-browser";
import { LoadingController } from "ionic-angular";
import { AccountLoginStatus } from "../../interfaces/account/account-login-status.interface";

@Component({
    selector: 'agora-login-footer',
    templateUrl: 'login-footer.component.html'
})
export class LoginFooterComponent {

    @Output() skipLoginEvent: EventEmitter<boolean>;
    @Output() loginStatus: EventEmitter<AccountLoginStatus>;

    @Input() showSkipButton: boolean;

    constructor( private epicAccountProvider: EpicAccountProvider,
                 private inAppBrowser: InAppBrowser,
                 private loadingCtrl: LoadingController ) {

        this.skipLoginEvent = new EventEmitter<boolean>();
        this.loginStatus = new EventEmitter<AccountLoginStatus>();

    }

    skipLogin() {
        this.skipLoginEvent.emit(true);
    }

    async login() {

        let agoraLoginUrl = this.epicAccountProvider.getLoginUrl();
        let epicLoginUrl = this.epicAccountProvider.getEpicLoginUrl();

        let loader = this.loadingCtrl.create({
            content: 'Connecting to Epic...'
        });
        loader.present();

        let browserLogin = this.inAppBrowser.create(agoraLoginUrl, '_blank', {
            zoom: 'no',
            location: 'no',
            closeButtonCaption: 'Cancel',
            hidden: 'yes'
        });

        browserLogin.on('loadstop').subscribe(( event: InAppBrowserEvent ) => {

            console.log('loadstop');
            console.log(event);

            if ( event.url.indexOf(epicLoginUrl) > -1 ) {
                loader.dismiss();
                browserLogin.show();
            }
        });

        browserLogin.on('loadstart').subscribe(( event: InAppBrowserEvent ) => {

            console.log('loadstart');
            console.log(event);

            // Successful login.
            if ( event.url.indexOf('agora.gg/login?code') > -1 ) {

                let code = this.getParameterByName('code', event.url);
                browserLogin.close();
                this.authorizeAccount(code);
            }
        });

        browserLogin.on('exit').subscribe(( event ) => {

            console.log('exit');
            console.log(event);

            try {
                loader.dismiss();
            } catch ( e ) {
                console.error(e);
            }
        })
    }

    private async authorizeAccount( code ) {

        let loader = this.loadingCtrl.create({
            content: 'Logging in with your Epic account...'
        });

        loader.present();
        let response = await this.epicAccountProvider.authorizeLogin(code);
        loader.dismiss();
        this.loginStatus.emit(response);
    }

    function

    getParameterByName( name, url ) {
        if ( !url ) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if ( !results ) return null;
        if ( !results[ 2 ] ) return '';
        return decodeURIComponent(results[ 2 ].replace(/\+/g, " "));
    }

}
