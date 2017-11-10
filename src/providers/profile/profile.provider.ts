import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/toPromise";
import { AgoraCacheProvider } from "../agora-cache/agora-cache.provider";
import { PlayerProfile } from "../../interfaces/player-profile/player-profile.model";
import { LifetimeStats } from "../../interfaces/player-stats/lifetime-stats.interface";

@Injectable()
export class ProfileProvider {

    private storageKey = 'profile';

    constructor( private http: Http, private agoraCacheProvider: AgoraCacheProvider ) {

    }

    public async getProfile( playerId: number, season?: string ) {

        try {
            const response = await this.http.get(`https://api.agora.gg/v1/players/${playerId}?season=3`).toPromise();
            return <PlayerProfile>response.json();
        } catch ( e ) {
            console.log(e);
            return null;
        }

    }

    public getCachedProfile() {
        return this.agoraCacheProvider.getDataFromCache(this.storageKey);
    }

    public async getLifetimeStats( accountGuid: string ) {
        try {
            let response = await this.http.get(`https://epic.agora.gg//v1/account/${accountGuid}/stats`).toPromise();
            return <LifetimeStats>response.json();
        } catch ( e ) {
            return null;
        }
    }

}