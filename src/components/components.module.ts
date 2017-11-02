import { NgModule } from "@angular/core";
import { IonicModule } from "ionic-angular";
import { LoginFooterComponent } from "./login-footer/login-footer.component";
import { SpriteLeagueComponent } from './sprite-league/sprite-league.component';
import { SpriteHeroAvatarComponent } from './sprite-hero-avatar/sprite-hero-avatar.component';
import { LogoutFooterComponent } from './logout-footer/logout-footer.component';

@NgModule({
    declarations: [
        LoginFooterComponent,
        SpriteLeagueComponent,
        SpriteHeroAvatarComponent,
    LogoutFooterComponent
    ],
    imports: [ IonicModule ],
    exports: [
        LoginFooterComponent,
        SpriteLeagueComponent,
        SpriteHeroAvatarComponent,
    LogoutFooterComponent
    ]
})
export class ComponentsModule {

}