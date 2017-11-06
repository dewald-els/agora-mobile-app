import { Component } from "@angular/core";
import { IonicPage, LoadingController } from "ionic-angular";
import { HeroProvider } from "../../providers/hero/hero.provider";
import { Hero } from "../../interfaces/hero/hero";

@IonicPage()
@Component({
    selector: 'heroes-page',
    templateUrl: 'heroes.html'
})
export class HeroesPage {

    private heroes = [] as Hero[];
    private filteredHeroes = [] as Hero[];
    private attackTypeFilter = 'all';

    constructor( private loadingCtrl: LoadingController, private heroProvider: HeroProvider ) {
        this.getAllHeroes();
    }

    async getAllHeroes() {
        let loader = this.loadingCtrl.create({
            content: 'Loading heroes...'
        });
        loader.present();

        this.heroes = await this.heroProvider.getHeroes();
        this.filteredHeroes = this.heroes;
        loader.dismiss();
    }

    filterHeroes( event ) {
        let searchQuery = event.target.value;
        if ( searchQuery ) {
            this.attackTypeFilter = 'all';
            this.filteredHeroes = this.heroes.filter(( hero: Hero ) => {
                return (hero.name.toLowerCase()).includes(searchQuery.toLowerCase());
            });
        } else {
            this.filteredHeroes = this.heroes;
        }
    }

    clearFilter( event ) {
        this.filteredHeroes = this.heroes;
    }

    onSegmentClicked( filter: string ) {
        if ( filter === 'all' ) {
            this.filteredHeroes = this.heroes;
        } else {
            this.filteredHeroes = this.heroes.filter(( hero: Hero ) => {
                return (hero.attack.toLowerCase()).includes(filter.toLowerCase());
            });
        }
    }
}
