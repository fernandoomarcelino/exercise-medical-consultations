// import { BaseResourceModel } from '../resources/base-resource/base-resource.model';
// import {ModuleModel} from '../resources/system/module/module.model';


import {BaseResourceModel} from './base-resource.model';

export class PaginationModel extends BaseResourceModel {
  constructor(
    public id?: number,
    public current_page?: number,
    public data?: any,
    public first_page_url?: string,
    public from?: number,
    public last_page?: number,
    public next_page_url?: string,
    public path?: string,
    public per_page?: number,
    public prev_page_url?: any,
    public last_page_url?: any,
    public to?: number,
    public total?: number,

  // public module?: ModuleModel,
  ) {
    super();
  }


  static fromJson(jsonData: any): PaginationModel {
    return Object.assign(new PaginationModel(), jsonData);
  }
}
