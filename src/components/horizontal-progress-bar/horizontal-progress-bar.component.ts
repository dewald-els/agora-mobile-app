import { Component, Input } from '@angular/core';

@Component({
  selector: 'horizontal-progress-bar',
  templateUrl: 'horizontal-progress-bar.component.html'
})
export class HorizontalProgressBarComponent {

  @Input() percentage;

  constructor() {

  }

}
