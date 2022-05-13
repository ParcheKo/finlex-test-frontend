import {DataSource} from '@angular/cdk/collections';
import {PersonService} from '../../service/person.service';
import {Observable} from 'rxjs';
import {Person} from '../../models/peson';

export class PersonDataSource extends DataSource<any> {
  constructor(private dataService: PersonService) {
    super();
  }

  connect(): Observable<Person[]> {
    return this.dataService.load();
  }

  disconnect() {
  }
}
