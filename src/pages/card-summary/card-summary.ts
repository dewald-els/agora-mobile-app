import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ParagonCard } from "../../interfaces/card/paragon-card.interface";

@IonicPage()
@Component({
    selector: 'page-card-summary',
    templateUrl: 'card-summary.html',
})
export class CardSummaryPage {

    private card: ParagonCard;
    private affinityColor: string = 'affinity-';

    constructor( public navCtrl: NavController, public navParams: NavParams ) {

        this.card = this.navParams.get('card');
        this.affinityColor += this.card.affinity.toLowerCase();

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CardSummaryPage');
    }


}
