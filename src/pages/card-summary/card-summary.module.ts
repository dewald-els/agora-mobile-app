import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CardSummaryPage } from './card-summary';

@NgModule({
  declarations: [
    CardSummaryPage,
  ],
  imports: [
    IonicPageModule.forChild(CardSummaryPage),
  ],
})
export class CardSummaryPageModule {}
