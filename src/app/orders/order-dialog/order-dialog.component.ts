import {Component, EventEmitter, Inject} from '@angular/core';
import {OrderService} from '../service/order.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Order, OrderViewModel} from '../models/order';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.css']
})
export class OrderDialogComponent {
  // order = {
  //   // id: '',
  //   orderDate: '',
  //   createdBy: '',
  //   orderNo: '',
  // };
  public event: EventEmitter<any> = new EventEmitter();

  form: FormGroup;
  title = '';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<OrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderViewModel,
    public dataService: OrderService
  ) {
    this.title = this.getTitle([data.personName, data.createdBy, data.orderNo].filter(p => !!p)) || 'New Order';
    this.form = this.fb.group({
      orderDate: ['', [Validators.required]],
      createdBy: ['', [Validators.required, Validators.email]],
      orderNo: ['', [Validators.required, Validators.maxLength(50)]],
      productName: ['', [Validators.required, Validators.maxLength(100)]],
      total: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      price: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    console.log(this.form.invalid);
    // this.event.emit({data: this.order});
    this.dialogRef.close(this.form.valid ? this.form.value : null);
  }

  private getTitle(list: string[], separator?: string): string {
    return list.join(separator || ' - ');
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  };
}
