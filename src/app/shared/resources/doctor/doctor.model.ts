import {BaseResourceModel} from '../base-resource/base-resource.model';
import {SpecialtiesModel} from '../specialties/specialties.model';

export class DoctorModel extends BaseResourceModel {
  constructor(
    public id?: number,
    public nome?: string,
    public crm?: number,
    public email?: string,
    public telefone?: string,
    public especialidade?: SpecialtiesModel,
    public page?: number,
  ) {
    super();
  }

  static fromJson(jsonData: any): DoctorModel {
    return Object.assign(new DoctorModel(), jsonData);
  }

}
