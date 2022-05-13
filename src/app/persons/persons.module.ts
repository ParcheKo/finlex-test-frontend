import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PersonsRoutingModule} from './persons-routing.module';
import {PersonsComponent} from './container/persons/persons.component';
import {SharedModule} from '../shared/shared.module';
import {StoreModule} from '@ngrx/store';
import * as fromPerson from '../persons/store/person.reducer';
import {EffectsModule} from '@ngrx/effects';
import {PersonEffects} from '../persons/store/person.effects';


@NgModule({
  declarations: [PersonsComponent],
  imports: [
    CommonModule,
    PersonsRoutingModule,
    SharedModule,
    StoreModule.forFeature(fromPerson.personsFeatureKey, fromPerson.reducer),
    EffectsModule.forFeature([PersonEffects])
  ]
})
export class PersonsModule {
}
