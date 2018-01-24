import { Component, setTestabilityGetter } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { HeroProvider } from "../../providers/hero/hero.provider";
import { Hero } from "../../interfaces/hero/hero";
import { Ability } from "../../interfaces/hero/ability.interface";

@IonicPage({
    name: 'hero-summary',
    segment: 'hero-summary/:heroId',
    defaultHistory: [ 'HeroStatsPage' ]
})
@Component({
    selector: 'page-hero-summary',
    templateUrl: 'hero-summary.html',
})
export class HeroSummaryPage {

    private pageTitle: string = 'Hero Summary';
    private heroId: string = '0fd6f97096f0356e479dc8ef23dcd819';
    private hero = {} as Hero;
    private heroBackground: string = '';

    constructor( public navCtrl: NavController, public navParams: NavParams,
                 private heroProvider: HeroProvider,
                 private loadingCtrl: LoadingController ) {
        this.heroId = this.navParams.get('heroId');
        this.getHeroSummary();
    }

    private async getHeroSummary() {

        let loader = this.loadingCtrl.create({
            content: 'Loading hero summary...'
        });
        loader.present();

        this.hero = await this.heroProvider.getHeroSummary(this.heroId);
        let heroes = await this.heroProvider.getHeroes();

        heroes.map(( hero: Hero ) => {
            if ( hero.id == this.hero.id ) {
                this.hero.code = hero.code;
            }
        });

        this.hero.abilities.forEach(( ability: Ability ) => {
            ability.iconUrl = this.heroProvider.getAbilityIconUrl(ability.icon);

            this.setAbilityData(ability);

        });

        this.hero.affinity1Icon = this.heroProvider.getAffinityIconUrl(this.hero.affinity1);
        this.hero.affinity2Icon = this.heroProvider.getAffinityIconUrl(this.hero.affinity2);

        this.pageTitle = this.hero.name;


        loader.dismiss();

        if ( this.hero.name == 'Drongo' ) {
            this.hero.code = 'HeroData_Shrapnel';
        }

    }

    setAbilityData( ability: Ability ) {

        let modifiers: any[] = [];

        // Build a item with a string of modifiers.
        ability.modifiersByLevel.forEach(( level ) => {

            if ( !level ) {
                return;
            }

            level.forEach(( modifier ) => {

                if ( !modifiers[ modifier.modifier ] ) {
                    modifiers[ modifier.modifier ] = {
                        modifier: modifier.modifier,
                        value: modifier.value + ' / '
                    };
                    return;
                }

                modifiers[ modifier.modifier ].value += modifier.value + ' / ';

            });

        });

        // Replace the values in the descriptions with the modifiers.
        for ( var key in modifiers ) {

            if ( key === 'cooldown' && modifiers[ key ] ) {

                let cooldowns = modifiers[ key ].value.split('/');
                cooldowns.pop();

                let allMatch = cooldowns.every(( val, i, arr ) => val * 1 === arr[ 0 ] * 1);
                if ( allMatch ) {
                    ability.cooldown = cooldowns[ 0 ];
                } else {
                    ability.cooldown = modifiers[ key ].value.slice(0, -2);
                }
            }

            ability.description = ability.description.replace('{' + key + '}', '[' + modifiers[ key ].value.slice(0, -2) + ' ] ');

            console.log(ability.description.indexOf('{attr:physar}'));

            // {attr:physar}
            ability.description = ability.description.replace('{attr:physar}', 'Basic Armor');
            // {attr:physdmg}
            ability.description = ability.description.replace('{attr:physdmg}', 'Basic Damage');

        }

    }

}
