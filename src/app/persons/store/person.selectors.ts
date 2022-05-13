import {createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromStore from './person.reducer';

const personsSelector = createFeatureSelector<fromStore.PersonState>(fromStore.personsFeatureKey);

export const isLoading = createSelector(personsSelector, fromStore.selectIsLoading);
export const persons = createSelector(personsSelector, fromStore.selectAll);
export const error = createSelector(personsSelector, fromStore.selectError);
