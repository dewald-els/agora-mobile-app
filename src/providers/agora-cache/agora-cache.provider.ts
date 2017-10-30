import { Injectable } from "@angular/core";

@Injectable()
export class AgoraCacheProvider {

    private expireTimeLimit = 86400000; // 24 Hours in milliseconds.

    constructor() {}

    // Get data from localStorage based on key.
    public getDataFromCache( key: string ) {

        let cacheDate = this.getDataCacheDate(key);
        let currentDate = new Date().getTime();

        if (currentDate - cacheDate > this.expireTimeLimit) {
            return false;
        }

        let data = window.localStorage.getItem(`agora__${key}`);
        return ! data ? false : JSON.parse(data);
    }

    // Return the date in milliseconds
    public getDataCacheDate( key: string ) {
        let date = window.localStorage.getItem(`agora__cache_${key}`);
        return !date ? false : parseInt(date);
    }

    //Save to cache with new Cache date for data.
    public saveToCache( key: string, data: any ) {
        window.localStorage.setItem(`agora__cache_${key}`, new Date().getTime().toString());
        window.localStorage.setItem(`agora__${key}`, JSON.stringify(data));
    }

}