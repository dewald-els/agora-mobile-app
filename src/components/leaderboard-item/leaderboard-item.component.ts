import { Component, Input } from '@angular/core';
import { Leaderboard } from "../../interfaces/leaderboard/leaderboard.interface";

@Component({
    selector: 'leaderboard-item',
    templateUrl: 'leaderboard-item.component.html'
})
export class LeaderboardItemComponent {

    @Input() leader: Leaderboard;
    @Input() index : number;

    constructor() {
    }

}
