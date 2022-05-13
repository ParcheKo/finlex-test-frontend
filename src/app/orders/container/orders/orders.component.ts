import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {OrderService} from '../../service/order.service';
import {OrderDialogComponent} from '../../order-dialog/order-dialog.component';
import {OrderDataSource} from './order.dataSource';
import * as fromActions from '../../../orders/store/order.actions';
import * as fromSelector from '../../../orders/store/orders.selectors';
import * as fromStore from '../../store/order.reducer';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Order} from '../../models/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  orders$: Observable<Order[]>;

  constructor(public dialog: MatDialog, private dataService: OrderService,
              private store: Store<fromStore.OrderState>) {
    this.store.dispatch(fromActions.requestLoadOrders());
    this.orders$ = this.store.select(fromSelector.orders);
    this.isLoading$ = this.store.select(fromSelector.isLoading);
    this.error$ = this.store.select(fromSelector.error);
    this.store.select(state => state).subscribe(data => {
      console.log('data', data);
    });
  }

  displayedColumns = ['id', 'orderDate', 'createdBy', 'orderNo'];
  dataSource = new OrderDataSource(this.dataService);

  // deletePost(id: any) {
  //     this.dataService.deletePost(id);
  //     this.dataSource = new PostDataSource(this.dataService);
  // }

  openDialog(): void {
    let dialogRef = this.dialog.open(OrderDialogComponent, {
      width: '600px',
      data: 'Add Post'
    });
    // dialogRef.componentInstance.event.subscribe((result) => {
    //   this.dataService.registerOrder(result.data);
    //   this.dataSource = new OrderDataSource(this.dataService);
    // });
  }

  ngOnInit(): void {
  }
}

