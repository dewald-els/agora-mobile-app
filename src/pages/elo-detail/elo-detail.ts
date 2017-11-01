import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-elo-detail',
    templateUrl: 'elo-detail.html',
})
export class EloDetailPage {

    constructor( private viewCtrl: ViewController ) {
    }

    close() {
        this.viewCtrl.dismiss();

    }

}
