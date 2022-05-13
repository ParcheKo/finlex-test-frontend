import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {delay, map, switchMap} from 'rxjs/operators';

import {PersonService} from '../service/person.service';
import {loadPersons, requestLoadPersons, searchPerson} from './person.actions';

@Injectable()
export class PersonEffects {

  constructor(private actions$: Actions, private service: PersonService) {
  }

  loadPersons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestLoadPersons),
      switchMap(action =>
        this.service.load().pipe(
          // delay(3000), // when faking the http request delay
          map(data => loadPersons({persons: data}))
        ))
    )
  );

  searchPerson$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchPerson),
      switchMap(action => this.service.search(action.searchQuery)
        .pipe(
          delay(1000),
          map(data => loadPersons({persons: data}))
        ))
    )
  );
}
