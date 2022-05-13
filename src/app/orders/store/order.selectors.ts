import {createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromStore from './order.reducer';

const ordersSelector = createFeatureSelector<fromStore.OrderState>(fromStore.ordersFeatureKey);

export const isLoading = createSelector(ordersSelector, fromStore.selectIsLoading,);
export const orders = createSelector(ordersSelector, fromStore.selectAll);
export const error = createSelector(ordersSelector, fromStore.selectError);
