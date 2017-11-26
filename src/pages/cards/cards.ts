import { Component, ViewChild } from '@angular/core';
import { Content, Img, InfiniteScroll, IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { CardProvider } from "../../providers/card/card.provider";
import { ParagonCard } from "../../interfaces/card/paragon-card.interface";
import { AFFINITY } from "../../static-models/affinity/affinities.static";
import { updateImgs } from "ionic-angular/components/content/content";

@IonicPage()
@Component({
    selector: 'page-cards',
    templateUrl: 'cards.html',
})
export class CardsPage {

    private cards = [] as ParagonCard[];
    private filteredCards = []  as ParagonCard[];

    private growthCards = [];
    private chaosCards = [];
    private orderCards = [];
    private deathCards = [];
    private knowledgeCards = [];
    private approxScrollHeight = '0px';

    constructor( private navCtrl: NavController, private cardProvider: CardProvider, private platform: Platform ) {
        this.getAllCards();
    }

    /*
    2017-11-26
    start FIX#1 ion-img doesn't correctly work with virtualScroll
    https://github.com/ionic-team/ionic/issues/9660#issuecomment-304840427
    */
    @ViewChild(Content) _content: Content;
    ngAfterViewInit() {
        if ( this._content ) {
            this._content.imgsUpdate = () => {
                if ( this._content._scroll.initialized && this._content._imgs.length && this._content.isImgsUpdatable() ) {
                    // reset cached bounds
                    this._content._imgs.forEach(( img: Img ) => img._rect = null);
                    // use global position to calculate if an img is in the viewable area
                    updateImgs(this._content._imgs, this._content._cTop * -1, this._content.contentHeight, this._content.directionY, 1400, 400);
                }
            };
        }
    }

    /*
    end FIX#1
    */

    private async getAllCards() {
        this.cards = await this.cardProvider.getAllCards();
        this.approxScrollHeight = (42 * this.cards.length) + "px";
        this.filteredCards = this.cards;
        this.cards.forEach(( card: ParagonCard ) => {

            switch ( card.affinity.toLowerCase() ) {
                case AFFINITY.CHAOS :
                    this.chaosCards.push(card);
                    break;
                case AFFINITY.DEATH :
                    this.deathCards.push(card);
                    break;
                case AFFINITY.GROWTH :
                    this.growthCards.push(card);
                    break;
                case AFFINITY.ORDER :
                    this.orderCards.push(card);
                    break;
                case AFFINITY.KNOWLEDGE :
                    this.knowledgeCards.push(card);
                    break;
                default :
                    return false;
            }
        });
    }

    public searchCards( event ) {
        console.log(event.target.value);

        let value = event.target.value;

        if ( value ) {
            value = value.toLowerCase().trim();
            this.filteredCards = this.cards.filter(( card: ParagonCard ) => {
                console.log(card.name.toLowerCase());
                return card.name.toLowerCase().indexOf(value) > -1;
            })
        }
        else {
            this.filteredCards = this.cards;
        }


        console.log(this.filteredCards);
    }

    private showCardSummaryPage( card: ParagonCard ) {
        this.navCtrl.push('CardSummaryPage', {
            card: card
        });
    }
}
