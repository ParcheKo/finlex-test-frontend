import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {Order} from '../models/order';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {
  }

  load(): Observable<Order[]> {
    // return this.http.get<Order[]>('assets/data/orders.json'); // using fake json data
    return this.http.get<Order[]>(environment.apiBaseUrl + '/orders');
  }

  search(searchQuery: string): Observable<Order[]> {
    return this.load().pipe(
      map((list: Order[]) => list.filter((value) => value.createdBy.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1))
    );
  }
}
