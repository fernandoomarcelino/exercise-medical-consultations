import {NgModule} from '@angular/core';

import {SharedModule} from '../../shared/shared.module';
import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {ScheduleModule} from '../schedule/schedule.module';
import {ConsultModule} from '../consult/consult.module';


@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule,
    ScheduleModule,
    ConsultModule,
  ],
  declarations: [DashboardComponent],
  exports: [],
  providers: []

})


export class DashboardModule {
}
