import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../../shared/models/product';
import {DataService} from '../../shared/services/data.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  @Input() isHandset$: Observable<boolean>;
  products: Product[];

  constructor(private data: DataService) {
  }

  ngOnInit() {
    this.data.fetchData().subscribe(
      value => {
        this.products = value;
        console.log(this.products);
      }
    );


  }

  arrayGen(num: number) {
    return Array(num);
  }

}
