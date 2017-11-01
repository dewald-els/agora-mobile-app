import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { League } from "../../interfaces/league/league.interface";
import { LEAGUES } from "../../static-models/leagues/leagues.static";

@IonicPage()
@Component({
    selector: 'page-elo-detail',
    templateUrl: 'elo-detail.html',
})
export class EloDetailPage {

    private leagues : League[] = LEAGUES;

    constructor( private viewCtrl: ViewController ) {
    }

    close() {
        this.viewCtrl.dismiss();
    }

}
