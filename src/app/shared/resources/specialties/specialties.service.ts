import {Injectable, Injector} from '@angular/core';


import {BaseResourceService} from '../base-resource/base-resource.service';
import {SpecialtiesModel} from './specialties.model';


@Injectable({
  providedIn: 'root'
})
export class SpecialtiesService extends BaseResourceService<SpecialtiesModel> {

  constructor(protected injector: Injector) {
    super('especialidades/', injector, SpecialtiesModel.fromJson);
  }
}
