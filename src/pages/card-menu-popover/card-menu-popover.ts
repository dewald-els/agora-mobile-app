import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AFFINITY } from "../../static-models/affinity/affinities.static";


@IonicPage()
@Component({
    selector: 'page-card-menu-popover',
    templateUrl: 'card-menu-popover.html',
})
export class CardMenuPopoverPage {

    private filter: string = '';
    private options = [];

    constructor( public viewCtrl: ViewController, public navParams: NavParams ) {
        this.filter = this.navParams.get('filter');
        this.setOptions();
    }

    private setOptions() {
        this.options.push({
            name: 'Chaos',
            value: AFFINITY.CHAOS
        });

        this.options.push({
            name: 'Death',
            value: AFFINITY.DEATH
        });

        this.options.push({
            name: 'Order',
            value: AFFINITY.ORDER
        });

        this.options.push({
            name: 'Growth',
            value: AFFINITY.GROWTH
        });

        this.options.push({
            name: 'Knowledge',
            value: AFFINITY.KNOWLEDGE
        });
    }

    setAffinityFilter( filter ) {

        this.filter = filter;

        this.viewCtrl.dismiss({
            filter: filter
        });

    }

    clearFilter() {
        this.viewCtrl.dismiss({
            filter: 'all'
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CardMenuPopoverPage');
    }

}
