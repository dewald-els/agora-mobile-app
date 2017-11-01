import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { SideMenuPage } from "./side-menu";

@NgModule({
    declarations: [
        SideMenuPage,
    ],
    imports: [
        IonicPageModule.forChild(SideMenuPage)
    ],
    exports: []
})
export class SideMenuPageModule {
}