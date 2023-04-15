import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-product-slider-dots',
  templateUrl: './products-slider-dots.component.html',
  styleUrls: ['./products-slider-dots.component.scss'],
})
export class ProductSliderDotsComponent implements OnInit {

  @Input('len') len: number;
  @Input('activeItem') activeItem: number;
  @Output('changeItem') changeItem = new EventEmitter<number>();

  dots : number[]= [];

  constructor() {
  }

  ngOnInit() {
    for (let i = 0; i < this.len; i++) {
      this.dots.push(i);
    }
  }

}