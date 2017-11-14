
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/toPromise";

@Injectable()
export class LeaderboardProvider {
    constructor(private http : Http) {

    }

    public async getLeaderboards(page: number = 0, limit : number = 20) {
        try {
            let response = await this.http.get(`https://api.agora.gg/v2/leaderboards?page=${page}&limit=${limit}`).toPromise();
            return response.json();
        } catch (e) {
            return e;
        }
    }
}