import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppSetupPage } from './app-setup';

@NgModule({
  declarations: [
    AppSetupPage,
  ],
  imports: [
    IonicPageModule.forChild(AppSetupPage),
  ],
})
export class AppSetupPageModule {}
