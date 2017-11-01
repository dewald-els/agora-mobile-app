import { Injectable } from "@angular/core";

@Injectable()
export class AgoraCacheProvider {

    constructor() {}

    // Get data from localStorage based on key.
    public getDataFromCache( key: string ) {

        let data = window.localStorage.getItem(`agora__${key}`);
        return ! data ? false : JSON.parse(data);
    }

    //Save to cache with new Cache date for data.
    public saveToCache( key: string, data: any ) {
        window.localStorage.setItem(`agora__cache_${key}`, new Date().getTime().toString());
        window.localStorage.setItem(`agora__${key}`, JSON.stringify(data));
    }

}