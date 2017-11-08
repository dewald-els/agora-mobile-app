import { Component, Input, OnInit } from '@angular/core';
import { Ability } from "../../interfaces/hero/ability.interface";

@Component({
    selector: 'ability-list-card',
    templateUrl: 'ability-list-card.component.html'
})
export class AbilityListCardComponent implements OnInit {


    @Input() abilities: Array<Ability>;
    private abilityList = [] as Array<Ability>;

    constructor() {
    }

    ngOnInit(): void {
        this.abilityList = this.abilities;
    }

}
