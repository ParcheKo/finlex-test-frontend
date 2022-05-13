import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OrdersRoutingModule} from './orders-routing.module';
import {OrdersComponent} from './container/orders/orders.component';
import {OrderDialogComponent} from './order-dialog/order-dialog.component';
import {StoreModule} from '@ngrx/store';
import * as fromOrder from '../orders/store/order.reducer';
import {EffectsModule} from '@ngrx/effects';
import {OrderEffects} from '../orders/store/order.effects';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [OrdersComponent, OrderDialogComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedModule,
    StoreModule.forFeature(fromOrder.ordersFeatureKey, fromOrder.reducer),
    EffectsModule.forFeature([OrderEffects])
  ]
})
export class OrdersModule {
}
