import {Component, Injector, OnInit} from '@angular/core';
import {ScheduleModel} from '../../../shared/resources/schedule/schedule.model';
import {ScheduleService} from '../../../shared/resources/schedule/schedule.service';
import {BaseResourceListComponentDirective} from '../../../shared/components/base-resource-list/base-resource-list-component.directive';


@Component({
  selector: 'app-schedule-list',
  templateUrl: 'schedule-list.component.html',
  styleUrls: ['schedule-list.component.scss']
})
export class ScheduleListComponent extends BaseResourceListComponentDirective<ScheduleModel> implements OnInit {

  constructor(
    protected injector: Injector,
    protected scheduleService: ScheduleService,
  ) {
    super(injector, scheduleService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

}
