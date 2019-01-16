import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../models/product';
import {map, retry} from 'rxjs/operators';
import {RawDataSet} from '../models/interfaces';

const API_ENDPOINT = 'https://6shgntz9ka.execute-api.us-west-2.amazonaws.com/test/products';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private  http: HttpClient) {
  }

  fetchData(): Observable<Product[]> {
    const httpOptions = {
      headers: new HttpHeaders({'x-api-key': 'EIP3oOCbk48goGK0d2c5G8c3v6ukje4a8gWORat7'}),
      cache: true
    };
    return this.http.get<RawDataSet>(API_ENDPOINT, httpOptions).pipe(
      retry(3),
      map(res => res.products.map(rawData => new Product(rawData)))
    );
  }


}


