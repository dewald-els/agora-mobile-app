import { Component, Input } from '@angular/core';

@Component({
    selector: 'agora-sprite-league',
    templateUrl: 'sprite-league.component.html'
})
export class SpriteLeagueComponent {

    @Input() public spriteSize : string;
    @Input() public league : string

}

