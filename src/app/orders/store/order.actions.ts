import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

import { Order } from '../models/order';

export const requestLoadOrders = createAction(
  '[Order/API] Request Load Orders'
);

export const loadOrders = createAction(
  '[Order/API] Load Orders',
  props<{ orders: Order[] }>()
);

export const addOrder = createAction(
  '[Order/API] Add Order',
  props<{ order: Order }>()
);

export const updateOrder = createAction(
  '[Order/API] Update Order',
  props<{ order: Update<Order> }>()
);

export const deleteOrder = createAction(
  '[Order/API] Delete Order',
  props<{ id: string }>()
);

export const searchOrder = createAction(
  '[Order/API] Search Orders',
  props<{ searchQuery: string }>()
);
