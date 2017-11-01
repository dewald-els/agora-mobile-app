import { NgModule } from "@angular/core";
import { HeroesPage } from "./heroes";
import { IonicPageModule } from "ionic-angular";

@NgModule({
    declarations: [
        HeroesPage,
    ],
    imports: [
        IonicPageModule.forChild(HeroesPage)
    ],
    exports: []
})
export class HeroesPageModule {


}