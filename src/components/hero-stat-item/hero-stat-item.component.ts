import { Component, EventEmitter, Input, Output, Pipe } from '@angular/core';
import { HeroStats } from "../../interfaces/hero/hero-stats.interface";

@Component({
    selector: 'hero-stat-item',
    templateUrl: 'hero-stat-item.component.html'
})
export class HeroStatItemComponent {

    @Input('heroStat') heroStat: HeroStats;
    @Output() loadHeroPage: EventEmitter<string>;

    constructor() {
        this.loadHeroPage = new EventEmitter<string>();
    }

    onHeroStatItemClicked( heroId: string ) {
        this.loadHeroPage.emit(heroId);
    }

}
