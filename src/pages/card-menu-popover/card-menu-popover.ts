import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component( {
    selector: 'page-card-menu-popover',
    templateUrl: 'card-menu-popover.html',
} )
export class CardMenuPopoverPage {

    private filter: any;

    constructor( public viewCtrl: ViewController, public navParams: NavParams ) {
    }

    setAffinityFilter() {
        if (this.filter) {
            this.viewCtrl.dismiss( {
                filter: this.filter
            } );
        }

    }

    clearFilter() {
        this.viewCtrl.dismiss( {
            filter: 'all'
        } );
    }

    ionViewDidLoad() {
        console.log( 'ionViewDidLoad CardMenuPopoverPage' );
    }

}
