import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/toPromise";

@Injectable()
export class ProfileProvider {

    constructor( private http: Http ) {

    }

    public async getProfile( playerId: number, season?: string ) {

        try {
            const response = await this.http.get(`https://api.agora.gg/v1/players/${playerId}?season=3`).toPromise();
            return response.json();
        } catch ( e ) {
            console.log(e);
            return null;
        }

    }

}