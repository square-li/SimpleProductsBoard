import {Component} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';

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

  constructor(private breakpointObserver: BreakpointObserver) {

  }


}
