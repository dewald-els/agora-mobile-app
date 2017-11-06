import { NgModule } from "@angular/core";
import { ProfilePage } from "./profile";
import { IonicPageModule } from "ionic-angular";
import { ProfileMenuPopoverPageModule } from "../profile-menu-popover/profile-menu-popover.module";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
    declarations: [
        ProfilePage
    ],
    imports: [
        IonicPageModule.forChild(ProfilePage),
        ProfileMenuPopoverPageModule,
        ComponentsModule
    ],
    exports: [
    ]
})
export class ProfilePageModule {
}