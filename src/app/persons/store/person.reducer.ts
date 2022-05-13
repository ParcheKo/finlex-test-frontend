import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';

import {Person} from '../models/peson';
import * as PersonActions from './person.actions';

export const personsFeatureKey = 'persons';

export interface PersonState extends EntityState<Person> {
  isLoading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<Person> = createEntityAdapter<Person>();

export const initialState: PersonState = adapter.getInitialState({
  isLoading: true,
  error: null
});

export const reducer = createReducer(
  initialState,
  on(PersonActions.addPerson,
    (state, action) => adapter.addOne(action.person, state)
  ),
  on(PersonActions.updatePerson,
    (state, action) => adapter.updateOne(action.person, state)
  ),
  on(PersonActions.deletePerson,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(PersonActions.loadPersons,
    (state, action) => adapter.setAll(action.persons, {
      ...state,
      isLoading: false
    })
  ),
  on(PersonActions.requestLoadPersons,
    (state, action) => adapter.setAll([], {
      ...state,
      isLoading: true
    })
  )
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectIsLoading = (state: PersonState) => state.isLoading;
export const selectError = (state: PersonState) => state.error;
