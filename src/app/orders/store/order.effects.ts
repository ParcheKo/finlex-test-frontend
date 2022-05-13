import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {delay, map, switchMap} from 'rxjs/operators';

import {OrderService} from '../service/order.service';
import {loadOrders, registerOrder, requestLoadOrders, searchOrder} from './order.actions';
import {pipe} from 'rxjs';

@Injectable()
export class OrderEffects {

  constructor(private actions$: Actions, private service: OrderService) {
  }

  requestLoadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestLoadOrders),
      switchMap(action =>
        this.service.load().pipe(
          // delay(3000), // when faking the http request delay
          map(data => loadOrders({orders: data}))
        ))
    )
  );

  // todo: implement searching for an order by email
  searchOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchOrder),
      switchMap(action => this.service.search(action.searchQuery)
        .pipe(
          delay(1000),
          map(data => loadOrders({orders: data}))
        ))
    )
  );

  registerOrder$ = createEffect(() =>
    // todo
    this.actions$.pipe(
      ofType(registerOrder),
      // todo: ?? how is action of type Order?!
      switchMap(action => this.service.register(action.order)
        .pipe(
          map(data => requestLoadOrders())
        ))
    )
  );
}
