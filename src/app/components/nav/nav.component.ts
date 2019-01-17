import {ChangeDetectorRef, Component} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Product} from '../../shared/models/product';
import {DataService} from '../../shared/services/data.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe('(min-width:930px)')
    .pipe(
      map(result => !result.matches)
    );

  sortBy$: Subject<{ order: string, ascending: number }> = new Subject();
  products$ = new ReplaySubject<Product[]>(1);
  originalData$ = new ReplaySubject<Product[]>(1);
  dataReady = false;

  constructor(private dataService: DataService, private breakpointObserver: BreakpointObserver, private cdRef: ChangeDetectorRef) {
    dataService.fetchData().subscribe(value => {
      this.originalData$.next(value);
      this.products$.next(value);
      this.dataReady = true;
    });
  }

  onSearch(results: Product[]) {
    console.log('Searching result:', results);
    this.products$.next(results);
  }
}
