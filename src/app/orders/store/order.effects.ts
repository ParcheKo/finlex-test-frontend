import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {delay, map, switchMap} from 'rxjs/operators';

import {OrderService} from '../service/order.service';
import {loadOrders, requestLoadOrders, searchOrder} from './order.actions';

@Injectable()
export class OrderEffects {

  constructor(private actions$: Actions, private service: OrderService) {}

  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestLoadOrders),
      switchMap(action =>
        this.service.load().pipe(
          // delay(3000), // when faking the http request delay
          map(data => loadOrders({orders: data}))
      ))
    )
  );

  searchOrder$ = createEffect(() =>
      this.actions$.pipe(
        ofType(searchOrder),
        switchMap(action => this.service.search(action.searchQuery)
        .pipe(
          delay(1000),
          map(data => loadOrders({orders: data}))
        ))
      )
  );
}
