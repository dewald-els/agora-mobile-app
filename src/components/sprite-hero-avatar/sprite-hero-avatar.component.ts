import { Component, Input } from '@angular/core';

@Component({
    selector: 'agora-sprite-hero-avatar',
    templateUrl: 'sprite-hero-avatar.component.html'
})
export class SpriteHeroAvatarComponent {

    private _size : string;
    private _heroName : string;

    constructor() {
    }

    @Input()
    public size(size : string) {
        this._size = size;
    }

    @Input()
    public heroName(heroName : string) {
        this._heroName = heroName;
    }
}

