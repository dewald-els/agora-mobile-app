import { NgModule } from '@angular/core';
import { ToFixedPipe } from './to-fixed/to-fixed';
import { DurationPipe } from './duration/duration';

@NgModule({
    declarations: [
        ToFixedPipe,
        DurationPipe
    ],
    imports: [],
    exports: [
        ToFixedPipe,
        DurationPipe
    ]
})
export class PipesModule {
}
