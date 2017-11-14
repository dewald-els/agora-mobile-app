import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BaseProvider } from "../base-provider";
import "rxjs/add/operator/toPromise";

@Injectable()
export class CardProvider extends BaseProvider{

    constructor( public http: Http ) {
        super();
        this.storageKey = 'cards';
    }

    public async getAllCards() {
        try {
            let response = await this.http.get(`https://api.agora.gg/v2/cards`).toPromise();
            return response.json();
        }
        catch (e) {
            return e;
        }
    }

}
