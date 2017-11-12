import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'toFixed',
})
export class ToFixedPipe implements PipeTransform {

    private decimals: number = 0;

    transform( value: number, ...args ): string {

        if ( args.length ) {
            this.decimals = args[ 0 ];
        }
        return value.toFixed(this.decimals);

    }
}
