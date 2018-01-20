import { Component, ViewChild } from '@angular/core';
import {
    Content, Img, IonicPage, NavController, PopoverController,
    LoadingController
} from 'ionic-angular';
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

    private cards: ParagonCard[] = [];

    private knowledgeCards: ParagonCard[] = [];
    private deathCards: ParagonCard[] = [];
    private chaosCards: ParagonCard[] = [];
    private growthCards: ParagonCard[] = [];
    private orderCards: ParagonCard[] = [];

    private filter : string = '';

    constructor( private navCtrl: NavController, private cardProvider: CardProvider, private popoverCtrl: PopoverController, private loadingCtrl: LoadingController ) {

        this.getCards();

    }

    /**
     * Fetch all the cards from the Agora services.
     * @returns {Promise<void>}
     */
    private async getCards() {

        let loader = this.loadingCtrl.create({
            content: 'Getting all cards...'
        });
        loader.present();

        let cardsUnsorted = await this.cardProvider.getAllCards();


        this.deathCards = cardsUnsorted.filter(( card: ParagonCard ) => {
            return card.affinity.toLowerCase() == AFFINITY.DEATH
        });
        this.chaosCards = cardsUnsorted.filter(( card: ParagonCard ) => {
            return card.affinity.toLowerCase() == AFFINITY.CHAOS
        });
        this.growthCards = cardsUnsorted.filter(( card: ParagonCard ) => {
            return card.affinity.toLowerCase() == AFFINITY.GROWTH
        });
        this.orderCards = cardsUnsorted.filter(( card: ParagonCard ) => {
            return card.affinity.toLowerCase() == AFFINITY.ORDER
        });
        this.knowledgeCards = cardsUnsorted.filter(( card: ParagonCard ) => {
            return card.affinity.toLowerCase() == AFFINITY.KNOWLEDGE
        });

        this.sortCardsByName();

        this.loadAllCards();

        loader.dismiss();
    }

    sortCardsByName() {
        this.chaosCards = this.sortObjectsArray(this.chaosCards, 'name');
        this.deathCards = this.sortObjectsArray(this.deathCards, 'name');
        this.growthCards = this.sortObjectsArray(this.growthCards, 'name');
        this.orderCards = this.sortObjectsArray(this.orderCards, 'name');
        this.knowledgeCards = this.sortObjectsArray(this.knowledgeCards, 'name');
    }

    /**
     * Reload all the cards into the cards array.
     */
    private loadAllCards() {
        this.cards = [];
        this.cards.push(...this.chaosCards);
        this.cards.push(...this.deathCards);
        this.cards.push(...this.growthCards);
        this.cards.push(...this.orderCards);
        this.cards.push(...this.knowledgeCards);
    }

    /**
     * Quicksort
     * Source: https://stackoverflow.com/a/33806642/3527807
     * @param objectsArray
     * @param sortKey
     * @returns {any}
     */

    sortObjectsArray( objectsArray, sortKey ) {
        // Quick Sort:
        var retVal;

        if ( 1 < objectsArray.length ) {
            var pivotIndex = Math.floor((objectsArray.length - 1) / 2);  // middle index
            var pivotItem = objectsArray[ pivotIndex ];                    // value in the middle index
            var less = [], more = [];

            objectsArray.splice(pivotIndex, 1);                          // remove the item in the pivot position
            objectsArray.forEach(function ( value, index, array ) {
                value[ sortKey ] <= pivotItem[ sortKey ] ?                   // compare the 'sortKey' proiperty
                    less.push(value) :
                    more.push(value);
            });

            retVal = this.sortObjectsArray(less, sortKey).concat([ pivotItem ], this.sortObjectsArray(more, sortKey));
        }
        else {
            retVal = objectsArray;
        }

        return retVal;
    }

    /**
     * Go to the cards summary page with the stats.
     * @param card
     */
    goToCardSummary( card: ParagonCard ) {

        this.navCtrl.push('card-summary', {
            card: card
        });
    }

    /**
     * Search through the cards based on the name
     * @param $event
     */
    filterCardsByName( $event ) {

        let searchValue = $event.target.value;

        if ( searchValue && searchValue.trim().length > 1 ) {
            this.loadAllCards();
            this.cards = this.cards.filter(( card: ParagonCard ) => {
                return card.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
            })
        } else {
            this.loadAllCards();
        }

    }

    /**
     * Show a menu that filters the cards
     */
    showFilterMenu( $event ) {
        let popover = this.popoverCtrl.create('CardMenuPopoverPage', {
            filter : this.filter
        });
        popover.onDidDismiss(( data: any ) => {

            if ( data && data.filter ) {
                console.log(data.filter);
                this.filter = data.filter;
                switch ( data.filter ) {
                    case 'all' : {
                        this.loadAllCards();
                    }
                        break;
                    case AFFINITY.CHAOS : {
                        this.cards = this.chaosCards;
                    }
                        break;
                    case AFFINITY.DEATH : {
                        this.cards = this.deathCards;
                    }
                        break;
                    case AFFINITY.GROWTH : {
                        this.cards = this.growthCards;
                    }
                        break;
                    case AFFINITY.ORDER : {
                        this.cards = this.orderCards;
                    }
                        break;
                    case AFFINITY.KNOWLEDGE : {
                        this.cards = this.knowledgeCards;
                    }
                        break;
                    default : {
                        this.loadAllCards();
                    }
                }
            }


        });
        popover.present({
            ev: $event
        });
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
}
