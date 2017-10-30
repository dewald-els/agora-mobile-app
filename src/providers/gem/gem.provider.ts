import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BaseProvider } from "../base-provider";
import { AgoraCacheProvider } from "../agora-cache/agora-cache.provider";

@Injectable()
export class GemProvider extends BaseProvider {

    constructor( private http: Http, private cacheProvider: AgoraCacheProvider ) {
        super();
        this.storageKey = 'gems';
    }

}
