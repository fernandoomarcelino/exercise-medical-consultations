import {BaseResourceModel} from '../base-resource/base-resource.model';
import {DoctorModel} from '../doctor/doctor.model';
import {SpecialtiesModel} from '../specialties/specialties.model';

export class ScheduleModel extends BaseResourceModel {
  constructor(
    public id?: number,
    public medico?: DoctorModel,
    public dia?: string,
    public especialidade?: SpecialtiesModel,
    public data_inicio?: string,
    public data_final?: string,
    public page?: string,
    public horarios?: string[],
  ) {
    super();
  }

  static fromJson(jsonData: any): ScheduleModel {
    return Object.assign(new ScheduleModel(), jsonData);
  }

}
