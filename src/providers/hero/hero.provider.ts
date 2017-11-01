import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BaseProvider } from "../base-provider";
import { Hero } from "../../interfaces/hero/hero";
import "rxjs/add/operator/toPromise";

@Injectable()
export class HeroProvider extends BaseProvider {

    private heroes = [] as Hero[] || Boolean;

    constructor( public http: Http ) {
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
}
