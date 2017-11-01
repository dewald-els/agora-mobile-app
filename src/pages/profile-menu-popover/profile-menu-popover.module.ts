import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileMenuPopoverPage } from './profile-menu-popover';

@NgModule({
  declarations: [
    ProfileMenuPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileMenuPopoverPage),
  ],
})
export class ProfileMenuPopoverPageModule {}
