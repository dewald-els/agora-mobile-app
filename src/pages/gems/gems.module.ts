import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GemsPage } from './gems';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
    declarations: [
        GemsPage,
    ],
    imports: [
        IonicPageModule.forChild(GemsPage),
        ComponentsModule
    ],
})
export class GemsPageModule {
}
