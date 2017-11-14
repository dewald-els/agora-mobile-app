import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CardProvider } from "../../providers/card/card.provider";
import { ParagonCard } from "../../interfaces/card/paragon-card.interface";

@IonicPage()
@Component({
    selector: 'page-cards',
    templateUrl: 'cards.html',
})
export class CardsPage {

    private cards = [] as ParagonCard[];
    private filteredCards = [] as ParagonCard[];

    constructor( private cardProvider: CardProvider ) {
        this.getAllCards();

    }

    private async getAllCards() {
        this.cards = await this.cardProvider.getAllCards();
        this.filteredCards = this.cards;
        console.log(this.cards);
    }

    public filterCards( event ) {
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
