import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';


@IonicPage()
@Component({
    selector: 'page-faq',
    templateUrl: 'faq.html',
})
export class FaqPage {

    constructor( private navCtrl : NavController, private modalCtrl : ModalController) {
    }

    showEloDetail() {
        //this.navCtrl.push('EloDetailPage');
        this.modalCtrl.create('EloDetailPage').present();
    }

}
