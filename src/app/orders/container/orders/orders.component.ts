import {Component, OnInit} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {Order} from '../../models/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  constructor(public dialog: MatDialog, private dataService: DataService) {
  }

  displayedColumns = ['date_posted', 'title', 'category', 'delete'];
  dataSource = new PostDataSource(this.dataService);

  deletePost(id: any) {
      this.dataService.deletePost(id);
      this.dataSource = new PostDataSource(this.dataService);
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(PostDialogComponent, {
      width: '600px',
      data: 'Add Post'
    });
    dialogRef.componentInstance.event.subscribe((result) => {
      this.dataService.addPost(result.data);
      this.dataSource = new PostDataSource(this.dataService);
    });
  }

  ngOnInit(): void {
  }
}

export class PostDataSource extends DataSource<any> {
  constructor(private dataService: DataService) {
    super();
  }

  connect(): Observable<Order[]> {
    return this.dataService.getData();
  }

  disconnect() {
  }
}
