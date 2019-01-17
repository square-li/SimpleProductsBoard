import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../shared/models/product';
import {FormControl} from '@angular/forms';
import {Subject, timer} from 'rxjs';
import {debounce, map, tap} from 'rxjs/operators';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @Input() data: Subject<Product[]>;
  @Output() results = new EventEmitter<Product[]>();
  products: Product[];
  myControl: FormControl = new FormControl('');
  query: Subject<string> = new Subject<string>();
  done = true;

  constructor() {
  }

  ngOnInit() {
    this.data.pipe(tap(value => console.log(value))).subscribe(value => this.products = value);
    this.searchHelper(this.query).subscribe(results => {
      this.results.emit(results);
    });
    this.myControl.valueChanges.subscribe(
      () => {
        if (this.myControl.value === '') {
          this.results.emit(this.products);
        } else {
          this.query.next(this.myControl.value);
        }
      }
    );
  }


  searchHelper(query: Subject<string>) {
    return query.pipe(debounce(() => timer(500)), // debounce input to avoid make query too frequently
      tap(() => this.done = false),
      map(name => name.toLowerCase()),
      map(name => {
        // console.log(name, this.data);
        return this.products.filter(product =>
          product.name.toLowerCase().startsWith(name) || product.name.toLowerCase().includes(name));
      }),
      tap(() => this.done = true));
  }
}
