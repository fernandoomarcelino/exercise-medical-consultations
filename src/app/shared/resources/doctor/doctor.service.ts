import {Injectable, Injector} from '@angular/core';


import {BaseResourceService} from '../base-resource/base-resource.service';
import {DoctorModel} from './doctor.model';


@Injectable({
  providedIn: 'root'
})
export class DoctorService extends BaseResourceService<DoctorModel> {

  constructor(protected injector: Injector) {
    super('medicos/', injector, DoctorModel.fromJson);
  }
}
