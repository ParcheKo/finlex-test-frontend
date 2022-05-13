import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {Order, OrderDto, OrderViewModel, RegisterOrderRequest} from '../models/order';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {
  }

  load(): Observable<OrderViewModel[]> {
    // return this.http.get<Order[]>('assets/data/orders.json'); // using fake json data
    return this.http.get<OrderViewModel[]>(environment.apiBaseUrl + '/orders');
  }

  search(searchQuery: string): Observable<OrderViewModel[]> {
    return this.load().pipe(
      map((list: OrderViewModel[]) => list.filter((value) => value.createdBy.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1))
    );
  }

  // todo: use RegisterOrderRequest type instead of Order
  register(order: RegisterOrderRequest): Observable<OrderDto> {
    return this.http.post<OrderDto>(environment.apiBaseUrl + '/orders', order,
      {headers: this.getCustomHeaders()}
    );
  }

  private getCustomHeaders(): HttpHeaders {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8');
    // .set('Api-Key', 'xxx');
    return headers;
  }
}
