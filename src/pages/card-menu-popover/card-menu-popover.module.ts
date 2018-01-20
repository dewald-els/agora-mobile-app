import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CardMenuPopoverPage } from './card-menu-popover';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
    declarations: [
        CardMenuPopoverPage,
    ],
    imports: [
        IonicPageModule.forChild(CardMenuPopoverPage),
        ComponentsModule
    ],
})
export class CardMenuPopoverPageModule {
}
