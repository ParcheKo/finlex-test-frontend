import {Update} from '@ngrx/entity';
import {createAction, props} from '@ngrx/store';

import {Person} from '../models/peson';

export const requestLoadPersons = createAction(
  '[Person/API] Request Load Persons'
);

export const loadPersons = createAction(
  '[Person/API] Load Persons',
  props<{ persons: Person[] }>()
);

export const addPerson = createAction(
  '[Person/API] Add Person',
  props<{ person: Person }>()
);

export const updatePerson = createAction(
  '[Person/API] Update Person',
  props<{ person: Update<Person> }>()
);

export const deletePerson = createAction(
  '[Person/API] Delete Person',
  props<{ id: string }>()
);

export const searchPerson = createAction(
  '[Person/API] Search Persons',
  props<{ searchQuery: string }>()
);
