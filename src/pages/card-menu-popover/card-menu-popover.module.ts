import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CardMenuPopoverPage } from './card-menu-popover';

@NgModule({
  declarations: [
    CardMenuPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(CardMenuPopoverPage),
  ],
})
export class CardMenuPopoverPageModule {}
