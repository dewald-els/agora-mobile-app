import { NgModule } from "@angular/core";
import { IonicModule } from "ionic-angular";
import { WelcomeFooterComponent } from "./welcome-footer/welcome-footer.component";
import { SpriteLeagueComponent } from './sprite-league/sprite-league.component';
import { SpriteHeroAvatarComponent } from './sprite-hero-avatar/sprite-hero-avatar.component';

@NgModule({
    declarations: [
        WelcomeFooterComponent,
        SpriteLeagueComponent,
        SpriteHeroAvatarComponent
    ],
    imports: [ IonicModule ],
    exports: [
        WelcomeFooterComponent,
        SpriteLeagueComponent,
        SpriteHeroAvatarComponent
    ]
})
export class ComponentsModule {

}