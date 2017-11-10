import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MatchesPage } from './matches';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
    declarations: [
        MatchesPage,
    ],
    imports: [
        IonicPageModule.forChild(MatchesPage),
        ComponentsModule
    ],
})
export class MatchesPageModule {
}
