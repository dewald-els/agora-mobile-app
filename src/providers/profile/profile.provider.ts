import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BaseProvider } from "../base-provider";
import { AgoraCacheProvider } from "../agora-cache/agora-cache.provider";
import { EpicAccount } from "../../interfaces/account/epic-account.interface";

@Injectable()
export class ProfileProvider extends BaseProvider {

    constructor( public http: Http, private agoraCacheProvider: AgoraCacheProvider ) {
        super();
        this.storageKey = 'profile';
    }

    public getCachedProfile() {
        return this.agoraCacheProvider.getDataFromCache(this.storageKey);
    }

    public logout() {
        this.agoraCacheProvider.deleteFromCache(this.storageKey);
    }

    public saveToCache( profile: EpicAccount ) {
        this.agoraCacheProvider.saveToCache(this.storageKey, profile);
    }

    public isFirstStart() {
        return this.agoraCacheProvider.getDataFromCache('is-first-start')
    }
}