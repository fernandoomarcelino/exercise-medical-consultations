import {BaseResourceModel} from '../base-resource/base-resource.model';

export class SpecialtiesModel extends BaseResourceModel {
  constructor(
    public id?: number,
    public nome?: string,
  ) {
    super();
  }

  static fromJson(jsonData: any): SpecialtiesModel {
    return Object.assign(new SpecialtiesModel(), jsonData);
  }

}
