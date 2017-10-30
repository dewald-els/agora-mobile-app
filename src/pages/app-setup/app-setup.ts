import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HeroProvider } from "../../providers/hero/hero.provider";

@IonicPage()
@Component({
    selector: 'page-app-setup',
    templateUrl: 'app-setup.html',
})
export class AppSetupPage {

    constructor( public navCtrl: NavController, private heroProvider : HeroProvider) {
        // Cache heroes.
        // Cache cards.
        // Cache gems.

        this.getHeroes();
    }

    async getHeroes() {
        let heroes = await this.heroProvider.getHeroes();
        console.log(heroes);
    }

}
