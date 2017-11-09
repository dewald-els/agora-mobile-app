import { Component, setTestabilityGetter } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { HeroProvider } from "../../providers/hero/hero.provider";
import { Hero } from "../../interfaces/hero/hero";
import { Ability } from "../../interfaces/hero/ability.interface";

@IonicPage()
@Component({
    selector: 'page-hero-summary',
    templateUrl: 'hero-summary.html',
})
export class HeroSummaryPage {

    private pageTitle: string = 'Hero Summary';
    private heroId: string = '0fd6f97096f0356e479dc8ef23dcd819';
    private hero = {} as Hero;
    private heroBackground: string = '';

    constructor( public navCtrl: NavController, public navParams: NavParams, private heroProvider: HeroProvider, private loadingCtrl: LoadingController ) {
        this.heroId = this.navParams.get('heroId');
        this.getHeroSummary();
    }

    private async getHeroSummary() {

        let loader = this.loadingCtrl.create({
            content: 'Loading hero summary...'
        });
        loader.present();

        this.hero = await this.heroProvider.getHeroSummary(this.heroId);
        let heroes = this.heroProvider.getCachedHeroes();

        heroes.map(( hero: Hero ) => {
            if ( hero.id == this.hero.id ) {
                this.hero.code = hero.code;
            }
        });

        this.hero.abilities.forEach(( ability: Ability ) => {
            ability.iconUrl = this.heroProvider.getAbilityIconUrl(ability.icon);
        });

        this.hero.affinity1Icon = this.heroProvider.getAffinityIconUrl(this.hero.affinity1);
        this.hero.affinity2Icon = this.heroProvider.getAffinityIconUrl(this.hero.affinity2);

        this.pageTitle = this.hero.name;

        loader.dismiss();

        if ( this.hero.name == 'Drongo' ) {
            this.hero.code = 'HeroData_Shrapnel';
        }

        let img = new Image();
        img.onload = () => {
            this.heroBackground = 'url(//static.agora.gg/renders/' + this.hero.code + '.jpg)';
        };
        img.src = '//static.agora.gg/renders/' + this.hero.code + '.jpg';

        console.log(this.hero);
    }

}
