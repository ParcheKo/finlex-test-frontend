import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {PersonService} from '../../../persons/service/person.service';
import {Store} from '@ngrx/store';
import * as fromStore from '../../../persons/store/person.reducer';
import * as fromActions from '../../../persons/store/person.actions';
import * as fromSelector from '../../../persons/store/person.selectors';
import {PersonDataSource} from '../../../persons/container/persons/person.dataSource';
import {Person} from '../../models/peson';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonsComponent implements OnInit {

  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  persons$: Observable<Person[]>;

  constructor(private dialog: MatDialog, private dataService: PersonService,
              private store: Store<fromStore.PersonState>) {
    this.store.dispatch(fromActions.requestLoadPersons());
    this.persons$ = this.store.select(fromSelector.persons);
    this.isLoading$ = this.store.select(fromSelector.isLoading);
    this.error$ = this.store.select(fromSelector.error);
    this.store.select(state => state).subscribe(data => {
      console.log('persons', data);
    });
  }

  displayedColumns = ['name', 'email'];
  dataSource = new PersonDataSource(this.dataService);

  // deletePost(id: any) {
  //     this.dataService.deletePost(id);
  //     this.dataSource = new PostDataSource(this.dataService);
  // }

  ngOnInit(): void {
  }

}
