import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'duration',
})
export class DurationPipe implements PipeTransform {

    transform( totalSeconds: number, ...args ) {

        let result = "";
        let hours = Math.floor(totalSeconds / 3600);
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = ("0" + Math.floor(totalSeconds - (minutes * 60)).toString()).slice(-2);

        if ( hours > 0 ) {
            result += `${hours}:`
        }

        result += `${minutes}:${seconds}`;

        return result;
    }
}
