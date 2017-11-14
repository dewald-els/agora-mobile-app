import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeaderboardsPage } from './leaderboards';
import { PipesModule } from "../../pipes/pipes.module";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
    declarations: [
        LeaderboardsPage,
    ],
    imports: [
        IonicPageModule.forChild(LeaderboardsPage),
        ComponentsModule,
        PipesModule
    ],
})
export class LeaderboardsPageModule {
}
