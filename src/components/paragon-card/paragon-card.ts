import { Component } from '@angular/core';

/**
 * Generated class for the ParagonCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'paragon-card',
  templateUrl: 'paragon-card.html'
})
export class ParagonCardComponent {

  text: string;

  constructor() {
    console.log('Hello ParagonCardComponent Component');
    this.text = 'Hello World';
  }

}
