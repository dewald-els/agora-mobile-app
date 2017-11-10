import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/toPromise";
import { AgoraCacheProvider } from "../agora-cache/agora-cache.provider";

@Injectable()
export class ProfileProvider {

    private storageKey = 'profile';

    constructor( private http: Http, private agoraCacheProvider : AgoraCacheProvider) {

    }

    public async getProfile( playerId: number, season?: string ) {

        try {
            const response = await this.http.get(`https://api.agora.gg/v1/players/${playerId}?season=3`).toPromise();
            return response.json();
        } catch ( e ) {
            console.log(e);
            return null;
        }

    }

    public getCachedProfile() {
        return this.agoraCacheProvider.getDataFromCache(this.storageKey);
    }

}