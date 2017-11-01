import { Component, Input } from '@angular/core';

@Component({
    selector: 'agora-sprite-hero-avatar',
    templateUrl: 'sprite-hero-avatar.component.html'
})
export class SpriteHeroAvatarComponent {

    @Input() public size : string;
    @Input() public heroName : string;
}

