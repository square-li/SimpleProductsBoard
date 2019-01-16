import {Component, Input, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {Product} from '../../shared/models/product';
import {DataService} from '../../shared/services/data.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})

export class ProductPageComponent implements OnInit {

  @Input() sortBy$: Subject<{ order: string, ascending: number }>;
  products: Product[];
  length = 0;
  showList: Product[];
  start: number;
  productsPerPage = 100;
  sortedMsg: string;

  constructor(private data: DataService) {
  }

  ngOnInit() {
    this.data.fetchFakeData().subscribe(
      value => {
        this.products = value;
        this.length = this.products.length;
        this.start = 0;
        this.showList = this.products.slice(this.start, this.start + this.productsPerPage);
      }
    );
    this.sortedMsg = 'Sort by default order';
    this.sortBy$.subscribe(
      value => {
        const functions = {
          price: this.sortByPriceComparator,
          review: this.sortByReviewComparator,
          rating: this.sortByRatingComparator,
        };

        if (['price', 'review', 'rating'].findIndex(order => value.order === order) >= 0) {
          const order = value.ascending < 0 ? 'High to low' : 'Low to High';
          this.sortedMsg = `Sort by ${value.order}` + `(${order})`;
          this.sortArray(value.ascending, functions[value.order]);
          this.start = 0;
          this.showList = this.products.slice(this.start, this.start + this.productsPerPage);
        } else {
          throw Error('Invalid order' + value.order);
        }
      }
    );

  }


  arrayGen(num: number) {
    return Array(num);
  }

  priceFormatter(n: number) {
    const int = Math.floor(n / 100);
    const decimal = n - int * 100;
    return `$${int}.${decimal}`;
  }

  sortArray(ascending: number = 1, compareFunc?: (a: Product, b: Product) => number) {
    if (compareFunc) {
      this.products = this.products.sort((a, b) => compareFunc(a, b) * ascending);
    } else {
      this.products = this.products.sort((a, b) => this.sortByPriceComparator(a, b) * ascending);
    }
  }

  sortByPriceComparator(a: Product, b: Product): number {
    return a.price - b.price;
  }

  sortByReviewComparator(a: Product, b: Product): number {
    return a.reviewCount - b.reviewCount;
  }

  sortByRatingComparator(a: Product, b: Product): number {
    if (a.rating === b.rating) {
      return a.price - b.price;
    } else {
      return a.rating - b.rating;
    }
  }
}
