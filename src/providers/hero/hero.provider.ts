import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BaseProvider } from "../base-provider";
import { AgoraCacheProvider } from "../agora-cache/agora-cache.provider";
import { Hero } from "../../interfaces/hero/hero";
import "rxjs/add/operator/toPromise";

@Injectable()
export class HeroProvider extends BaseProvider {

    private heroes = [] as Hero[] || Boolean;

    constructor( public http: Http, private cacheProvider: AgoraCacheProvider ) {
        super();
        this.storageKey = 'heroes';
    }

    public async getHeroes() {

        this.heroes = this.cacheProvider.getDataFromCache(this.storageKey);

        if ( this.heroes === false ) {
            try {
                const response = await this.http.get('https://api.agora.gg/v1/gamedata/heroes').toPromise();
                this.cacheProvider.saveToCache(this.storageKey, response.json());
                return <Hero[]>response.json();
            } catch ( e ) {
                console.error(e);
                return [];
            }
        }
        else {
            return <Hero[]>this.heroes;
        }
    }
}
