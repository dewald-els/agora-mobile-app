import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { toPromise } from "rxjs/operator/toPromise";
import { EpicAccount } from "../../interfaces/account/epic-account.interface";
import { AccountLoginStatus } from "../../interfaces/account/account-login-status.interface";


@Injectable()
export class EpicAccountProvider {

    private clientId: string = '36afd031eee1443f9af0e5c08cc9b152';
    private account: EpicAccount;
    private epicLoginUrl: string = 'accounts.epicgames.com/login';

    constructor( private http: Http ) {

    }

    public getLoginUrl() {
        return `https://developer-paragon.epicgames.com/v1/auth/login/${this.clientId}`;
    }


    public getEpicLoginUrl() {
        return this.epicLoginUrl;
    }


    async authorizeLogin( code: string ) {
        try {
            let response = await this.http.get(`https://api.agora.gg/v1/epic/authorize/${code}?env=prod`).toPromise();
            return {
                result: true,
                account: <EpicAccount>response.json()
            };
        } catch ( e ) {
            return {
                result: false,
                error: e
            };
        }
    }

}