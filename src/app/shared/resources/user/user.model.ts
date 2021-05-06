import {BaseResourceModel} from '../base-resource/base-resource.model';

export class UserModel extends BaseResourceModel {
  constructor(
    public id?: number,
    public username?: string,
    public email?: string,
    public password?: string,
    public token?: string,
  ) {
    super();
  }

  static fromJson(jsonData: any): UserModel {
    return Object.assign(new UserModel(), jsonData);
  }

}
