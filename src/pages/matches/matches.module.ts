import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MatchesPage } from './matches';
import { ComponentsModule } from "../../components/components.module";
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
    declarations: [
        MatchesPage,
    ],
    imports: [
        IonicPageModule.forChild(MatchesPage),
        ComponentsModule,
        PipesModule
    ],
})
export class MatchesPageModule {
}
