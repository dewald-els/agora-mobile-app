import { Component, Input } from '@angular/core';

@Component({
    selector: 'agora-sprite-league',
    templateUrl: 'sprite-league.component.html'
})
export class SpriteLeagueComponent {

    private _spriteSize: string = '';
    private _league: string = '';

    constructor() {

    }

    @Input()
    public spriteSize( size: string ) {
        this._spriteSize = size;
    }

    @Input()
    public league( league: string ) {
        this._league = league;
    }

}

