import {Injectable, Injector} from '@angular/core';


import {BaseResourceService} from '../base-resource/base-resource.service';
import {UserModel} from './user.model';
import {Observable} from 'rxjs';
import {catchError, finalize, map} from 'rxjs/operators';
import {HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseResourceService<UserModel> {
  TYPE_FIND_FOR_SELECT = 'TYPE_FIND_FOR_SELECT';

  users: UserModel[];

  constructor(protected injector: Injector) {
    super('geral/user', injector, UserModel.fromJson);
  }

  login(resource: any): Observable<UserModel> {
    this.loadingService.addRequestToLoading();
    return this.http.post(`${environment.APIEndpoint}` + 'login', resource).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError),
      finalize(() => {
        this.loadingService.removeRequestToLoading();
      }),
    );
  }

  recoveryAccount(resource: any): Observable<any> {
    this.loadingService.addRequestToLoading();
    return this.http.post(`${environment.APIEndpoint}` + 'password/email', resource).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError),
      finalize(() => {
        this.loadingService.removeRequestToLoading();
      }),
    );
  }

  changeForgotPassword(resource: any): Observable<UserModel> {
    this.loadingService.addRequestToLoading();
    return this.http.post(`${environment.APIEndpoint}` + 'password/change', resource).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError),
      finalize(() => {
        this.loadingService.removeRequestToLoading();
      }),
    );
  }

  loginSocial(resource: any): Observable<UserModel> {
    this.loadingService.addRequestToLoading();
    return this.http.post(`${environment.APIEndpoint}` + 'login-social', resource).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError),
      finalize(() => {
        this.loadingService.removeRequestToLoading();
      }),
    );
  }

  loginInfo(token: string): Observable<UserModel> {
    this.token = new HttpHeaders().append('Authorization', 'Bearer ' + token);
    return this.http.get(`${environment.APIEndpoint}` + 'login-info', {headers: this.token})
      .pipe(
        map(this.jsonDataToResource.bind(this)),
        catchError(this.handleError)
      );
  }

  mySettings(): Observable<UserModel> {
    this.tokenUpdate();
    this.loadingService.addRequestToLoading();
    const url = `${environment.APIEndpoint + this.apiPath + '/my-settings/'}`;

    return this.http.get(url, {headers: this.token}).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError),
      finalize(() => {
        this.loadingService.removeRequestToLoading();
      }),
    );
  }

  // onSearchChange(searchValue: string, params: string): void {
  //   if (searchValue.length >= 2) {
  //     params = '?' + jQuery.param({
  //       text: searchValue,
  //     }) + '&' + params;
  //
  //     this.getAll(params).subscribe(
  //       result => {
  //         this.users = result;
  //         return result;
  //       }
  //     );
  //   }
  // }

  registerUser(resource: any): Observable<UserModel> {
    // this.loadingService.addRequestToLoading();
    console.log('resource', resource);
    return this.http.post(`${environment.APIEndpoint}` + 'new-account', resource).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError),
      finalize(() => {
        this.loadingService.removeRequestToLoading();
      }),
    );
  }

}
