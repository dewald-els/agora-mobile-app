import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BaseProvider } from "../base-provider";

@Injectable()
export class ProfileProvider extends BaseProvider{

    constructor( public http: Http ) {
        super();
        this.storageKey = 'cards';
    }

}
