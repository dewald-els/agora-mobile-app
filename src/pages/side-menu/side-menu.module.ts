import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { SideMenuPage } from "./side-menu";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
    declarations: [
        SideMenuPage,
    ],
    imports: [
        IonicPageModule.forChild(SideMenuPage),
        ComponentsModule
    ],
    exports: []
})
export class SideMenuPageModule {
}