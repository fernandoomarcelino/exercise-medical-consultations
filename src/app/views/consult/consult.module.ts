import {NgModule} from '@angular/core';

import {SharedModule} from '../../shared/shared.module';
import {ConsultListComponent} from './consult-list/consult-list.component';
import {ConsultFormComponent} from './consult-form/consult-form.component';
import {ConsultRoutingModule} from './consult-routing.module';
import {MatOptionModule} from '@angular/material/core';


@NgModule({
  imports: [
    SharedModule,
    ConsultRoutingModule,
    MatOptionModule,
  ],
  declarations: [ConsultFormComponent, ConsultListComponent],
  exports: [
    ConsultListComponent
  ],
  providers: []

})


export class ConsultModule {
}
