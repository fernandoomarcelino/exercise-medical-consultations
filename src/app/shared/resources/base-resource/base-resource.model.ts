import {SpecialtiesModel} from '../specialties/specialties.model';

export abstract class BaseResourceModel {
  id?: number;
  msg?: any;
  count?: any;
  next?: any;
  previous?: any;
  results?: any[];
}
