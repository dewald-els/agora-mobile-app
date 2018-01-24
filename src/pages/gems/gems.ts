import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { GemProvider } from "../../providers/gem/gem.provider";
import { Gem } from "../../interfaces/gem/gem.interface";

@IonicPage()
@Component({
    selector: 'page-gems',
    templateUrl: 'gems.html',
})
export class GemsPage {

    private gems : Gem[];

    constructor( public navCtrl: NavController, private loadingCtrl: LoadingController, private gemProvider: GemProvider ) {
        this.getAllGems();

    }

    private async getAllGems() {
        let loader = this.loadingCtrl.create({
            content: 'Fetching gems...'
        });
        loader.present();
        this.gems = await this.gemProvider.getAllGems();
        loader.dismiss();
    }


}
