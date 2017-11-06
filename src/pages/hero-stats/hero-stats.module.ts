import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HeroStatsPage } from './hero-stats';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
    declarations: [
        HeroStatsPage,
    ],
    imports: [
        IonicPageModule.forChild(HeroStatsPage),
        ComponentsModule
    ],
})
export class HeroStatsPageModule {
}
