import { NgModule } from "@angular/core";
import { HeroesPage } from "./heroes";
import { IonicPageModule } from "ionic-angular";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
    declarations: [
        HeroesPage,
    ],
    imports: [
        IonicPageModule.forChild(HeroesPage),
        ComponentsModule
    ],
    exports: []
})
export class HeroesPageModule {


}