import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {Person} from '../models/peson';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) {
  }

  load(): Observable<Person[]> {
    // return this.http.get<Person[]>('assets/data/persons.json'); // using fake json data
    return this.http.get<Person[]>(environment.apiBaseUrl + '/persons');
  }

  search(searchQuery: string): Observable<Person[]> {
    return this.load().pipe(
      map((list: Person[]) => list.filter((value) => value.name.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1))
    );
  }
}
