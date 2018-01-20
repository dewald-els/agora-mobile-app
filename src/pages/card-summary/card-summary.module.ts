import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CardSummaryPage } from './card-summary';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
    declarations: [
        CardSummaryPage,
    ],
    imports: [
        IonicPageModule.forChild(CardSummaryPage),
        ComponentsModule
    ],
})
export class CardSummaryPageModule {
}
