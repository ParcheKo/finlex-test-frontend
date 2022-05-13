import {DataSource} from '@angular/cdk/collections';
import {OrderService} from '../../service/order.service';
import {Observable} from 'rxjs';
import {Order} from '../../models/order';

export class OrderDataSource extends DataSource<any> {
  constructor(private dataService: OrderService) {
    super();
  }

  connect(): Observable<Order[]> {
    return this.dataService.load();
  }

  disconnect() {
  }
}
