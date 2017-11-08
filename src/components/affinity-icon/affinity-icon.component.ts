import { Component, Input, OnInit } from "@angular/core";
import { HeroProvider } from "../../providers/hero/hero.provider";

@Component({
    selector: 'affinity-icon',
    templateUrl: 'affinity-icon.component.html'
})
export class AffinityIconComponent implements OnInit {

    @Input() affinity;
    @Input() iconSize : number = 128;
    affinityIcon : string = '';

    constructor(private heroProvider : HeroProvider) {
    }

    ngOnInit() {
        this.affinity = this.affinity.toLowerCase();
        this.affinityIcon = this.heroProvider.getAffinityIconUrl(this.affinity);
    }


}