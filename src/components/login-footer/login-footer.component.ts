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
            if ( event.url.indexOf(epicLoginUrl) > -1 ) {
                loader.dismiss();
                browserLogin.show();
            }
        });

        browserLogin.on('loadstart').subscribe(( event: InAppBrowserEvent ) => {

            // Successful login.
            if ( event.url.indexOf('?code=') > -1 ) {
                let url = new URL(event.url);
                let code = url.searchParams.get("code");
                browserLogin.close();
                this.authorizeAccount(code);
            }
        });

        browserLogin.on('exit').subscribe(() => {
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

}
