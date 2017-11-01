import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GemsPage } from './gems';

@NgModule({
  declarations: [
    GemsPage,
  ],
  imports: [
    IonicPageModule.forChild(GemsPage),
  ],
})
export class GemsPageModule {}
