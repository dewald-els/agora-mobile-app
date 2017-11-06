import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HeroSummaryPage } from './hero-summary';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
    declarations: [
        HeroSummaryPage,
    ],
    imports: [
        IonicPageModule.forChild(HeroSummaryPage),
        ComponentsModule
    ],
})
export class HeroSummaryPageModule {
}
