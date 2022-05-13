import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';

import {Order} from '../models/order';
import * as OrderActions from './order.actions';

export const ordersFeatureKey = 'orders';

export interface OrderState extends EntityState<Order> {
  isLoading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<Order> = createEntityAdapter<Order>();

export const initialState: OrderState = adapter.getInitialState({
  isLoading: true,
  error: null
});

export const reducer = createReducer(
  initialState,
  on(OrderActions.addOrder,
    (state, action) => adapter.addOne(action.order, state)
  ),
  on(OrderActions.updateOrder,
    (state, action) => adapter.updateOne(action.order, state)
  ),
  on(OrderActions.deleteOrder,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(OrderActions.loadOrders,
    (state, action) => adapter.setAll(action.orders, {
      ...state,
      isLoading: false
    })
  ),
  on(OrderActions.requestLoadOrders,
    (state, action) => adapter.setAll([], {
      ...state,
      isLoading: true
    })
  )
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectIsLoading = (state: OrderState) => state.isLoading;
export const selectError = (state: OrderState) => state.error;
