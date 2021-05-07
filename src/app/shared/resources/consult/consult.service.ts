import {Injectable, Injector} from '@angular/core';


import {BaseResourceService} from '../base-resource/base-resource.service';
import {ConsultModel} from './consult.model';


@Injectable({
  providedIn: 'root'
})
export class ConsultService extends BaseResourceService<ConsultModel> {

  constructor(protected injector: Injector) {
    super('consultas/', injector, ConsultModel.fromJson);
  }
}
