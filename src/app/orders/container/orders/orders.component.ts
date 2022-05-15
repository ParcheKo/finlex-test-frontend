import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {OrderService} from '../../service/order.service';
import {OrderDialogComponent} from '../../order-dialog/order-dialog.component';
import {OrderDataSource} from './order.dataSource';
import * as fromActions from '../../../orders/store/order.actions';
import * as fromSelector from '../../store/order.selectors';
import * as fromStore from '../../store/order.reducer';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Order, OrderViewModel, RegisterOrderRequest} from '../../models/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersComponent implements OnInit {

  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  orders$: Observable<Order[]>;

  constructor(private dialog: MatDialog, private dataService: OrderService,
              private store: Store<fromStore.OrderState>) {
    this.store.dispatch(fromActions.requestLoadOrders());
    this.orders$ = this.store.select(fromSelector.orders);
    this.isLoading$ = this.store.select(fromSelector.isLoading);
    this.error$ = this.store.select(fromSelector.error);
    this.store.select(state => state).subscribe(data => {
      console.log('orders', data);
    });
  }

  displayedColumns = ['orderDate', 'createdBy', 'orderNo', 'productName', 'total', 'price', 'totalPrice'];
  dataSource = new OrderDataSource(this.dataService);

  openDialog(): void {
    let dialogRef = this.dialog.open(OrderDialogComponent, {
      width: '600px',
      data: {
        // pass the data object for Edit scenarios for example
      } as OrderViewModel,
      // closeOnNavigation:false
    });
    dialogRef.afterClosed().subscribe(
      (data: Order) => {
        if (!data) {
          console.log('User pressed CANCEL.');
        } else {
          console.log('User pressed SAVE with form data:', data);
          this.store.dispatch(fromActions.registerOrder({order: toRegisterOrderRequest(data)}));
          console.log('Register Order Dispatched.');
        }
      }
    );
  }

  ngOnInit(): void {
  }
}

export const toOrder = (registerOrderRequest: RegisterOrderRequest): Order => {
  return {
    orderNo: registerOrderRequest.orderNo,
    orderDate: registerOrderRequest.orderDate,
    createdBy: registerOrderRequest.personEmail,
    productName: registerOrderRequest.productName,
    price: registerOrderRequest.price,
    total: registerOrderRequest.total,
    id: '', // it is not available yet, to be fetched from read model, maybe a few seconds later ?
    totalPrice: 0, // it is not available yet, to be fetched from read model, maybe a few seconds later ?
    // todo ??
  };
};

export const toRegisterOrderRequest = (order: Order): RegisterOrderRequest => {
  return {
    orderDate: order.orderDate,
    personEmail: order.createdBy,
    orderNo: order.orderNo,
    productName: order.productName,
    total: order.total,
    price: order.price,
    // id: '', // ??
    // totalPrice: 0, // ??
    // todo ??
  };
};

