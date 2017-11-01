import { NgModule } from "@angular/core";
import { ProfilePage } from "./profile";
import { IonicPageModule } from "ionic-angular";
import { ProfileMenuPopoverPageModule } from "../profile-menu-popover/profile-menu-popover.module";

@NgModule({
    declarations: [
        ProfilePage
    ],
    imports: [
        IonicPageModule.forChild(ProfilePage),
        ProfileMenuPopoverPageModule
    ],
    exports: [
    ]
})
export class ProfilePageModule {
}