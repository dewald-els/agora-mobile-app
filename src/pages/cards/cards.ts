import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
    private filteredCards = [] as ParagonCard[];

    private growthCards = [];
    private chaosCards = [];
    private orderCards = [];
    private deathCards = [];
    private knowledgeCards = [];

    constructor( private cardProvider: CardProvider ) {
        this.getAllCards();
    }

    private async getAllCards() {
        this.cards = await this.cardProvider.getAllCards();
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
        console.log(this.cards);
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

}
