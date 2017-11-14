import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CardsPage } from './cards';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
    declarations: [
        CardsPage,
    ],
    imports: [
        IonicPageModule.forChild(CardsPage),
        ComponentsModule
    ],
})
export class CardsPageModule {
}
