import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BaseProvider } from "../base-provider";
import { Hero } from "../../interfaces/hero/hero";
import "rxjs/add/operator/toPromise";
import { HeroStats } from "../../interfaces/hero/hero-stats.interface";
import { AgoraCacheProvider } from "../agora-cache/agora-cache.provider";

@Injectable()
export class HeroProvider extends BaseProvider {

    private heroes = [] as Hero[] || Boolean;

    constructor( public http: Http, private cacheProvider: AgoraCacheProvider ) {
        super();
        this.storageKey = 'heroes';
    }

    public async getHeroes() {
        try {
            const response = await this.http.get('https://api.agora.gg/v1/gamedata/heroes').toPromise();
            return <Hero[]>response.json();
        } catch ( e ) {
            console.error(e);
            return [];
        }
    }

    public async getHeroStats( league?: string ) {
        try {
            const response = await this.http.get('https://api.agora.gg/v1/heroes/stats').toPromise();
            return <HeroStats[]>response.json();
        }
        catch ( error ) {
            return [];
        }
    }

    public cacheHeroes( heroes: Hero[] ): void {
        this.cacheProvider.saveToCache(this.storageKey, heroes);
    }

    public getCachedHeroes(): Hero[] {
        return <Hero[]>this.cacheProvider.getDataFromCache(this.storageKey);
    }

    public async getHeroSummary( heroId: string ) {

        try {
            const response = await this.http.get(`https://api.agora.gg/v1/gamedata/heroes/${heroId}`).toPromise();
            return response.json();
        } catch ( error ) {
            console.log(error);
            return null;
        }
    }

    public getAbilityIconUrl( iconCode: string ) {
        return `//static.agora.gg/skills/${iconCode}.png`;
    }

    public getAffinityIconUrl( affinityName: string ) {
        let name = affinityName.toLowerCase();
        return `assets/imgs/affinities/affinity-${name}.png`;
    }
}
