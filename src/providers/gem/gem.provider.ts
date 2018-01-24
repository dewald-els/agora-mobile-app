import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BaseProvider } from "../base-provider";
import { Gem } from "../../interfaces/gem/gem.interface";

@Injectable()
export class GemProvider extends BaseProvider {

    constructor( private http: Http ) {
        super();
        this.storageKey = 'gems';
    }

    public async getAllGems() {
        try {
            let response = await this.http.get(`https://api.agora.gg/v2/gems`).toPromise();
            return <Gem[]>response.json();
        }
        catch ( e ) {
            return e;
        }
    }

}
