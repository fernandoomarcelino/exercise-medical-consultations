import {NgModule} from '@angular/core';

import {SharedModule} from '../../shared/shared.module';
import {ScheduleFormComponent} from './schedule-form/schedule-form.component';
import {ScheduleListComponent} from './schedule-list/schedule-list.component';
import {ScheduleRoutingModule} from './schedule-routing.module';


@NgModule({
  imports: [
    SharedModule,
    ScheduleRoutingModule,
  ],
  declarations: [ScheduleFormComponent, ScheduleListComponent],
  exports: [
    ScheduleListComponent
  ],
  providers: []

})


export class ScheduleModule {
}
