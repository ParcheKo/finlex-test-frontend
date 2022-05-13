import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {OrderService} from '../../service/order.service';
import {OrderDialogComponent} from '../../order-dialog/order-dialog.component';
import {OrderDataSource} from './order.dataSource';
import * as fromActions from '../../../orders/store/order.actions';
import * as fromSelector from '../../store/order.selectors';
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

  // @ViewChild('empTbSort') empTbSort = new MatSort();

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
      console.log('data', data);
    });
  }

  displayedColumns = ['orderDate', 'createdBy', 'orderNo'];
  dataSource = new OrderDataSource(this.dataService);

  // deletePost(id: any) {
  //     this.dataService.deletePost(id);
  //     this.dataSource = new PostDataSource(this.dataService);
  // }

  openDialog(): void {
    let dialogRef = this.dialog.open(OrderDialogComponent, {
      width: '600px',
      data: {
        // pass the data object for Edit scenarios for example
      },
      // closeOnNavigation:false
    });
    dialogRef.afterClosed().subscribe(
      // todo: dispatch register-order or request-register-order action here
      data => {
        if (!data) {
          console.log('User pressed CANCEL.');
        } else {
          console.log('User press SAVE with form data:', data);
        }
      }
    );
    // dialogRef.componentInstance.event.subscribe((result) => {
    //   this.dataService.registerOrder(result.data);
    //   this.dataSource = new OrderDataSource(this.dataService);
    // });
  }

  ngOnInit(): void {
  }
}

