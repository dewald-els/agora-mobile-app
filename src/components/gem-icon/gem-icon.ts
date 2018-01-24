import { Component, Input, OnInit } from '@angular/core';
import { Gem } from "../../interfaces/gem/gem.interface";

@Component({
  selector: 'gem-icon',
  templateUrl: 'gem-icon.html'
})
export class GemIconComponent implements OnInit {

  @Input() gem : Gem;
  @Input() iconSize : string = 'sm';

  constructor() {
  }

  ngOnInit() {
  }
}
