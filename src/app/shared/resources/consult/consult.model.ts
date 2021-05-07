import {BaseResourceModel} from '../base-resource/base-resource.model';
import {DoctorModel} from '../doctor/doctor.model';
import {SpecialtiesModel} from '../specialties/specialties.model';

export class ConsultModel extends BaseResourceModel {
  constructor(
    public id?: number,
    public especialidade?: SpecialtiesModel,
    public medico?: DoctorModel,
    public dia?: string,
    public horario?: string,
    public data_agendamento?: string,
  ) {
    super();
  }

  static fromJson(jsonData: any): ConsultModel {
    return Object.assign(new ConsultModel(), jsonData);
  }

}
