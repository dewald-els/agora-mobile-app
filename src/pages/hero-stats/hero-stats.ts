import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController } from 'ionic-angular';
import { HeroProvider } from "../../providers/hero/hero.provider";
import { HeroStats } from "../../interfaces/hero/hero-stats.interface";
import { Hero } from "../../interfaces/hero/hero";
import { LEAGUES } from "../../static-models/leagues/leagues.static";
import { StatsProvider } from "../../providers/stats/stats.provider";

@IonicPage()
@Component({
    selector: 'page-hero-stats',
    templateUrl: 'hero-stats.html',
})
export class HeroStatsPage {

    private allHeroStats: any;
    private heroStats = [] as HeroStats[];
    private totalHeroStats = {} as HeroStats;
    private heroes = [] as Hero[];
    private leagues = LEAGUES;

    private sortStatsBy: string = 'wins';
    private filterByLeague: string = 'all';

    constructor( private loadingCtrl: LoadingController, private navCtrl: NavController, private heroProvider: HeroProvider, private statsProvider : StatsProvider) {
        this.getHeroStats();
        // don't allow master to be listed as a filter.
        this.leagues.pop();
    }

    async getHeroStats() {
        let loader = this.loadingCtrl.create({
            content: 'Loading hero stats...'
        });
        loader.present();
        this.allHeroStats = await this.heroProvider.getHeroStats();
        this.heroes = await this.heroProvider.getHeroes();
        this.heroProvider.cacheHeroes(this.heroes);
        this.keysToArray(this.filterByLeague);
        this.addHeroDataToStats();
        this.sortHeroStats();
        loader.dismiss();
    }

    private addHeroDataToStats() {
        this.heroStats.map(( heroStat: HeroStats ) => {
            console.log(heroStat);
            heroStat.winRate = Math.round(heroStat.wins * 100);
            heroStat.kdaRate = this.statsProvider.getKDARatio(heroStat.kills, heroStat.assists, heroStat.deaths);
            heroStat.pickRate = this.statsProvider.getPickRatio(heroStat.gamesPlayed, this.totalHeroStats.gamesPlayed);

            // Add hero data (Image, name etc)
            heroStat.heroData = this.heroes.find(( hero: Hero ) => {
                if ( hero.code === heroStat.hero ) return true;
                if ( !hero.code && heroStat.hero == 'HeroData_Shrapnel' ) return true;
            });
        });
    }

    private keysToArray( league: string ) {

        for ( let key in this.allHeroStats[ league ] ) {
            if ( key !== 'all' )
                this.heroStats.push(this.allHeroStats[ league ][ key ]);
        }

        this.totalHeroStats = this.allHeroStats[ league ].all;

    }

    private sortHeroStats() {
        this.heroStats = this.heroProvider.sortBy(this.sortStatsBy, this.heroStats);
    }

    private filterHeroStatsByLeague( league ) {
        this.heroStats = [];
        this.keysToArray(league);
        this.addHeroDataToStats();
        this.sortHeroStats();
    }

    private goToHeroSummaryPage( heroId: string ) {
        this.navCtrl.push('HeroSummaryPage', {
            heroId: heroId
        });
    }


}