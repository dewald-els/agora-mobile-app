import { NgModule } from "@angular/core";
import { IonicModule } from "ionic-angular";
import { LoginFooterComponent } from "./login-footer/login-footer.component";
import { SpriteLeagueComponent } from './sprite-league/sprite-league.component';
import { SpriteHeroAvatarComponent } from './sprite-hero-avatar/sprite-hero-avatar.component';
import { LogoutFooterComponent } from './logout-footer/logout-footer.component';
import { HorizontalProgressBarComponent } from './horizontal-progress-bar/horizontal-progress-bar.component';
import { HeroStatItemComponent } from "./hero-stat-item/hero-stat-item.component";
import { AffinityIconComponent } from "./affinity-icon/affinity-icon.component";
import { AbilityListCardComponent } from './ability-list-card/ability-list-card.component';
import { PipesModule } from "../pipes/pipes.module";
import { LeaderboardItemComponent } from './leaderboard-item/leaderboard-item.component';
import { ParagonCardComponent } from './paragon-card/paragon-card';

@NgModule({
    declarations: [
        LoginFooterComponent,
        SpriteLeagueComponent,
        SpriteHeroAvatarComponent,
        LogoutFooterComponent,
        HorizontalProgressBarComponent,
        HeroStatItemComponent,
        AffinityIconComponent,
        AbilityListCardComponent,
        LeaderboardItemComponent,
    ParagonCardComponent
    ],
    imports: [ IonicModule, PipesModule ],
    exports: [
        LoginFooterComponent,
        SpriteLeagueComponent,
        SpriteHeroAvatarComponent,
        LogoutFooterComponent,
        HorizontalProgressBarComponent,
        HeroStatItemComponent,
        AffinityIconComponent,
        AbilityListCardComponent,
        LeaderboardItemComponent,
    ParagonCardComponent
    ]
})
export class ComponentsModule {
}