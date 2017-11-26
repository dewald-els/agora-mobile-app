import { Component } from '@angular/core';
import { InfiniteScroll, IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { CardProvider } from "../../providers/card/card.provider";
import { ParagonCard } from "../../interfaces/card/paragon-card.interface";
import { AFFINITY } from "../../static-models/affinity/affinities.static";

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

    private cardWidth: number = 0;
    private cardHeight: number = 0;

    private chunkSize: number = 0;
    private chunkedCards: any;
    private currentChunk: number = 0;
    private infiniteScrollEnabled: boolean = true;

    constructor( private navCtrl: NavController, private cardProvider: CardProvider, private platform: Platform ) {
        this.cardWidth = (this.platform.width() / 2);
        this.cardHeight = this.cardWidth * 1.5;
        this.getAllCards();
    }


    private async getAllCards() {
        this.cards = await this.cardProvider.getAllCards();

        this.divideCardsIntoChunks();

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

    private divideCardsIntoChunks() {
        let totalCards = this.cards.length;
        this.chunkSize = Math.floor(totalCards / 10);
        this.chunkedCards = [];
        this.chunkedCards = this.cards.reduce(( add, curr, currentIndex ) => {
            if ( !(currentIndex % 10) ) {
                add.push(this.cards.slice(currentIndex, currentIndex + 10));
            }
            return add;
        }, []);

        this.filteredCards = this.chunkedCards[ this.currentChunk ];
    }

    private addScrollCards() {


        this.currentChunk++;
        if ( this.chunkedCards[ this.currentChunk ] ) {
            this.filteredCards.push(...this.chunkedCards[ this.currentChunk ]);
        } else {
            this.infiniteScrollEnabled = false;
        }


    }

    loadAllCards() {
        this.filteredCards = [];
        this.chunkedCards.forEach(( chunk ) => {
            this.filteredCards.push(...chunk);
        });
        this.infiniteScrollEnabled = false;
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
