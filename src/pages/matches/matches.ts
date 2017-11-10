import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Hero } from "../../interfaces/hero/hero";
import { HeroProvider } from "../../providers/hero/hero.provider";


@IonicPage()
@Component({
  selector: 'page-matches',
  templateUrl: 'matches.html',
})
export class MatchesPage {

    private heroes = [] as Hero[];
    private filterMatchesByHero : string = 'all';

  constructor(public navCtrl: NavController, public navParams: NavParams, private heroProvider : HeroProvider) {
      this.heroes = this.heroProvider.getCachedHeroes();
  }

}
