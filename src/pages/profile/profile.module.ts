import { NgModule } from "@angular/core";
import { ProfilePage } from "./profile";
import { IonicPageModule } from "ionic-angular";
import { ProfileMenuPopoverPageModule } from "../profile-menu-popover/profile-menu-popover.module";
import { ComponentsModule } from "../../components/components.module";
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
    declarations: [
        ProfilePage
    ],
    imports: [
        IonicPageModule.forChild(ProfilePage),
        ProfileMenuPopoverPageModule,
        ComponentsModule,
        PipesModule
    ],
    exports: [
    ]
})
export class ProfilePageModule {
}