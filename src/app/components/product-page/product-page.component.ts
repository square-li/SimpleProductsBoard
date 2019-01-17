import {Component, Input, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {Product} from '../../shared/models/product';
import {MessageService} from '../../shared/services/message.service';

const PRODUCTS_PER_PAGE = 20;

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  @Input() sortBy$: Subject<{ order: string, ascending: number }>;
  @Input('data') data: Subject<Product[]>;
  showList: Product[]; // List of currently shown products

  products: Product[];
  length = 0;
  totalPage = 0;
  startIndex: number;

  productsPerPage = PRODUCTS_PER_PAGE; // How many products shown for a single page
  sortedMsg: string;
  picsOnLoading: { [name: string]: boolean } = {};

  constructor(private messageService: MessageService) {

  }

  ngOnInit() {
    this.data.subscribe(value => {
      this.products = value;
      this.length = this.products.length;
      this.startIndex = 0;
      this.totalPage = Math.ceil(this.length / this.productsPerPage);
      this.showList = this.products.slice(this.startIndex, this.startIndex + this.productsPerPage);
    });

    // Init array states
    this.sortedMsg = 'Sort by default order.';

    // Observe sorting operations sent from outside
    this.sortBy$.subscribe(
      value => {
        const functions = {
          price: this.sortByPriceComparator,
          review: this.sortByReviewComparator,
          rating: this.sortByRatingComparator,
        };
        // Sort array according to the instruction
        if (['price', 'review', 'rating'].findIndex(order => value.order === order) >= 0) {
          const order = value.ascending < 0 ? 'High to low' : 'Low to High';
          this.sortedMsg = `Sort by ${value.order}` + `(${order})`;
          this.sortArray(value.ascending, functions[value.order]);
          this.startIndex = 0;
          this.showList = this.products.slice(this.startIndex, this.startIndex + this.productsPerPage);
        } else {
          throw Error('Invalid order ' + value.order);
        }
      }
    );

  }
  sortArray(ascending: number = 1, compareFunc?: (a: Product, b: Product) => number) {
    if (compareFunc) {
      this.products = this.products.sort((a, b) => compareFunc(a, b) * ascending);
    } else {
      this.products = this.products.sort((a, b) => this.sortByPriceComparator(a, b) * ascending);
    }
  }

  /**
   * Comparators
   * @param a First product
   * @param b Second product
   */
  sortByPriceComparator(a: Product, b: Product): number {
    return a.price - b.price;
  }

  sortByReviewComparator(a: Product, b: Product): number {
    return a.reviewCount - b.reviewCount;
  }

  sortByRatingComparator(a: Product, b: Product): number {
    if (a.rating === b.rating) {
      return b.price - a.price;
    } else {
      return a.rating - b.rating;
    }
  }

  /**
   * Hide spinner when product images are loaded.
   * @param name Name of the product
   */

  nextPage() {
    this.startIndex += this.productsPerPage;
    this.showList = this.products.slice(this.startIndex, this.startIndex + this.productsPerPage);
  }

  previousPage() {
    this.startIndex -= this.productsPerPage;
    this.showList = this.products.slice(this.startIndex, this.startIndex + this.productsPerPage);
  }

  goToPage(n: number) {
    this.startIndex = n * this.productsPerPage;
    this.showList = this.products.slice(this.startIndex, this.startIndex + this.productsPerPage);
  }

  showMore() {
    this.productsPerPage += PRODUCTS_PER_PAGE;
    this.showList = this.products.slice(this.startIndex, this.startIndex + this.productsPerPage);
  }

  showDetails(product: Product) {
    this.messageService.openDialog(product);
  }

  arrayGen(num: number) {
    const list = [];
    for (let i = 0; i < num; i++) {
      list.push(i);
    }
    return list;
  }


}
