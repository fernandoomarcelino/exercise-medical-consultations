import {Injectable, Injector} from '@angular/core';


import {BaseResourceService} from '../base-resource/base-resource.service';
import {ScheduleModel} from './schedule.model';


@Injectable({
  providedIn: 'root'
})
export class ScheduleService extends BaseResourceService<ScheduleModel> {

  constructor(protected injector: Injector) {
    super('agendas/', injector, ScheduleModel.fromJson);
  }
}
