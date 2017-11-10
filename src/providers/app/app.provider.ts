import { Injectable } from "@angular/core";
import { AgoraCacheProvider } from "../agora-cache/agora-cache.provider";

@Injectable()
export class AppProvider {

    private storageKey: string = 'app';
    private firstStartKey = 'first-start';

    constructor( private cacheProvider: AgoraCacheProvider ) {}

    public getFirstStartStatus() {
        return this.cacheProvider.getDataFromCache(this.firstStartKey);
    }

    public setFirstStartStatus() {
        this.cacheProvider.saveToCache(this.firstStartKey, new Date().getTime().toString());
    }



}