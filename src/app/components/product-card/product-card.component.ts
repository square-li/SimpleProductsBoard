import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../shared/models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() data: Product;
  @Input() large?: boolean;
  product: Product;
  loaded = false;

  constructor() {
  }

  ngOnInit() {
    this.product = this.data;
  }

  priceFormatter(n: number) {
    const int = Math.floor(n / 100);
    const decimal = n - int * 100;
    return `$${int}.${decimal}`;
  }

  onLoad() {
    this.loaded = true;
  }

  arrayGen(num: number) {
    const list = [];
    for (let i = 0; i < num; i++) {
      list.push(i);
    }
    return list;
  }
}
