import {Update} from '@ngrx/entity';
import {createAction, props} from '@ngrx/store';

import {Order, RegisterOrderRequest} from '../models/order';

export const requestLoadOrders = createAction(
  '[Order/API] Request Load Orders'
);

export const loadOrders = createAction(
  '[Order/API] Load Orders',
  props<{ orders: Order[] }>()
);

export const registerOrder = createAction(
  '[Order/API] Register Order',
  // todo: make it of type RegisterOrderRequest instead of Order
  props<{ order: RegisterOrderRequest }>()
);

// todo ??
// export const orderRegistered = createAction(
//   '[Order/API] Order Registered',
//   // todo: make it of type RegisterOrderRequest instead of Order
//   props<{ order: RegisterOrderRequest }>()
// );

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
