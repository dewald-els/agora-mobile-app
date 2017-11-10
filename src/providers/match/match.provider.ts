import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/toPromise";
import { Match } from "../../interfaces/match/match.interface";

@Injectable()
export class MatchProvider {


    constructor( private http: Http ) {

    }

    async getPlayerMatches( playerId: number, page?: number = 0, hero?: string = '' ) {

        try {
            let response = await this.http.get(`https://api.agora.gg/v1/players/${playerId}/history/match?page=${page}&start=2017-08-09T02:00:00Z&end=2020-08-09T13:29:59Z&hero=${hero}`).toPromise();
            return <Match>response.json();
        }
        catch ( e ) {
            return e;
        }


    }

}