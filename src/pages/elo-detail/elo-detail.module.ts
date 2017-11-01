import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EloDetailPage } from './elo-detail';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
    declarations: [
        EloDetailPage,
    ],
    imports: [
        IonicPageModule.forChild(EloDetailPage),
        ComponentsModule
    ],
})
export class EloDetailPageModule {
}
