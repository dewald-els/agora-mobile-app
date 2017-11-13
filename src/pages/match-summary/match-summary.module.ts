import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MatchSummaryPage } from './match-summary';
import { ComponentsModule } from "../../components/components.module";
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
    declarations: [
        MatchSummaryPage,
    ],
    imports: [
        IonicPageModule.forChild(MatchSummaryPage),
        ComponentsModule,
        PipesModule
    ],
})
export class MatchSummaryPageModule {
}
