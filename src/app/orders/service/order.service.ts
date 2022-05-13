import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Order} from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  load(): Observable<Order[]> {
    return this.http.get<Order[]>('assets/data/products.json');
  }

  searchByEmail(searchQuery: string): Observable<Order[]> {
    return this.load().pipe(
      map((list: Order[]) => list.filter((value) => value.createdBy.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1))
    );
  }
}
