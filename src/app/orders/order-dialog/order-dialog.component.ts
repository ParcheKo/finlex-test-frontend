import {Component, EventEmitter, Inject} from '@angular/core';
import {OrderService} from '../service/order.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.css']
})
export class OrderDialogComponent {
  order = {
    // id: '',
    orderDate: '',
    createdBy: '',
    orderNo: '',
  };
  public event: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<OrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dataService: OrderService
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    // todo: dispatch register-order or request-register-order action here
    // this.event.emit({data: this.order});
    this.dialogRef.close();
  }

}
