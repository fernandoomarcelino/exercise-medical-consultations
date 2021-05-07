import {BaseResourceModel} from './base-resource.model';

import {Injector} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {map, catchError, finalize} from 'rxjs/operators';


import {PaginationModel} from './pagination.model';
import {LoadingService} from '../../../core/services/loading.service';
import {environment} from '../../../../environments/environment';

// import toastr from 'toastr';

const LARAVEL_API = environment.APIEndpoint;

export abstract class BaseResourceService<T extends BaseResourceModel> {

  protected http: HttpClient;
  token = null;
  timeout: any;
  protected loadingService: LoadingService;
  protected authenticationService;

  constructor(
    protected apiPath: string,
    protected injector: Injector,
    protected jsonDataToResourceFn: (jsonData: any) => T,
  ) {
    this.http = injector.get(HttpClient);
    this.loadingService = this.injector.get(LoadingService);
  }

  public tokenUpdate(): any {
    this.token = new HttpHeaders().append('Authorization', 'Token ' + this.getToken());
  }

  getPaginations(param?): Observable<PaginationModel> {
    this.tokenUpdate();
    if (!param) {
      param = '';
    }
    return this.http.get(`${LARAVEL_API}` + this.apiPath + param, {headers: this.token})
      .pipe(
        map(this.jsonDataToPagination.bind(this)),
        catchError(this.handleError),
      );


  }

  getByUrlPagination(param?): Observable<PaginationModel> {
    this.tokenUpdate();
    if (!param) {
      param = '';
    }

    return this.http.get(param, {headers: this.token})
      .pipe(
        map(this.jsonDataToPagination.bind(this)),
        catchError(this.handleError),
      );
  }


  getAll(param?): Observable<T[]> {
    this.tokenUpdate();
    if (!param) {
      param = {};
    }
    return this.http.get(`${LARAVEL_API}` + this.apiPath, {headers: this.token, params: param}).pipe(
      map(this.jsonDataToResources.bind(this)),
      catchError(this.handleError),
    );
  }

  getById(id, param: string = ''): Observable<T> {
    this.tokenUpdate();
    this.loadingService.addRequestToLoading();
    const url = `${LARAVEL_API + this.apiPath}/${id}${param}`;

    return this.http.get(url, {headers: this.token}).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError),
      finalize(() => {
        this.loadingService.removeRequestToLoading();
      }),
    );
  }

  getDocument(param): Observable<T> {
    this.tokenUpdate();
    this.loadingService.addRequestToLoading();
    const url = `${LARAVEL_API + this.apiPath}/${param}`;

    return this.http.get(url, {headers: this.token, responseType: 'blob' as 'json'}).pipe(
      catchError(this.handleError),
      finalize(() => {
        this.loadingService.removeRequestToLoading();
      }),
    );
  }

  create(resource: T): Observable<T> {
    this.tokenUpdate();
    this.loadingService.addRequestToLoading();
    console.log('LARAVEL_API', LARAVEL_API);
    console.log('this.apiPath', this.apiPath);
    console.log('resource', resource);
    console.log('this.token', this.token);
    return this.http.post(`${LARAVEL_API}` + this.apiPath, resource, {headers: this.token}).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError),
      finalize(() => {
        this.loadingService.removeRequestToLoading();
      }),
    );
  }

  update(resource: T): Observable<T> {
    this.tokenUpdate();
    this.loadingService.addRequestToLoading();
    const url = `${LARAVEL_API + this.apiPath}/${resource.id}`;
    return this.http.put(url, resource, {headers: this.token}).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError),
      finalize(() => {
        this.loadingService.removeRequestToLoading();
      }),
    );
  }

  createOrUpdate(resource: T): Observable<T> {
    this.tokenUpdate();
    if (resource.id) {
      return this.update(resource);
    } else {
      return this.create(resource);
    }
  }

  delete(id: number): Observable<any> {
    this.tokenUpdate();
    this.loadingService.addRequestToLoading();
    const url = `${LARAVEL_API + this.apiPath}/${id}`;

    return this.http.delete(url, {headers: this.token}).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError),
      finalize(() => {
        this.loadingService.removeRequestToLoading();
      }),
    );
  }

  // PROTECTED METHODS

  protected jsonDataToResources(jsonData: any): T[] {
    const resources: T[] = [];

    if (jsonData.results) {
      jsonData = jsonData.results;
    }

    jsonData.forEach(
      element => resources.push(this.jsonDataToResourceFn(element))
    );
    return resources;
  }

  protected jsonDataToPagination(jsonData: any): PaginationModel {
    return this.jsonDataToResourceFn(jsonData);
  }

  public jsonDataToResource(jsonData: any): T {
    return this.jsonDataToResourceFn(jsonData);
  }

  protected handleError(error: any): Observable<any> {

    // console.log('error?.message', error.message);
    // if (error.status === 0) {
    //   toastr.error('Erro de conexão com o servidor');
    // } else if (error.status === 401 && error.statusText === 'Unauthorized') {
    //   toastr.error('Acesso não autorizado (token expirou?) problema a ser resolvido posteriormente. fazer login novamente.');
    // } else if (error.error?.message) {
    //     toastr.error('Erro: ' + error.error.message);
    // } else if (error.error?.length > 0) {
    //   toastr.error(error.error[0]);
    // } else {
    //   toastr.error('Erro desconhecido! Contate o administrador do sistema.');
    // }
    return throwError(error);
  }

  protected getFile() {
    // this.http.get(`${LARAVEL_API}` + this.apiPath + '/printTellerBalance/' + id,{headers: this.token, responseType: 'blob' as 'json'}).subscribe(
    //   (response: any) =>{
    //     this.downloadFile(response, filename);
    //   }
    // );
  }

  public downloadFile(response, filename = null): void {
    const dataType = response.type;
    const binaryData = [];
    binaryData.push(response);
    const downloadLink = document.createElement('a');
    downloadLink.target = '_blank';
    downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
    if (filename) {
      downloadLink.setAttribute('download', filename);
    }
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }


  getToken(): null|string {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      return currentUser.token;
    }
    return null;
  }

  public onKeySearch(event: any, params: string = '') {
    clearTimeout(this.timeout);
    const $this = this;
    this.timeout = setTimeout(function () {
      if (event.keyCode !== 13) {
        $this.onSearchChange(event, params);
      }
    }, 1000);
  }

  onSearchChange(searchValue: string, params: string): void {
  }


  // /**
  //  * Method is use to download file.
  //  * @param data - Array Buffer data
  //  * @param type - type of the document.
  //  */
  // downLoadFile(data: any, type: string) {
  //   let blob = new Blob([data], { type: type});
  //   let url = window.URL.createObjectURL(blob);
  //   let pwa = window.open(url);
  //   if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
  //     alert( 'Please disable your Pop-up blocker and try again.');
  //   }
  // }

}
