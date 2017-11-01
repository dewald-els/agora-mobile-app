import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BaseProvider } from "../base-provider";

@Injectable()
export class GemProvider extends BaseProvider {

    constructor( private http: Http ) {
        super();
        this.storageKey = 'gems';
    }

}
