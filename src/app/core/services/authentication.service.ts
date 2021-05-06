import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {BehaviorSubject, Observable, Subject} from 'rxjs';



import {ActivatedRoute, Router} from '@angular/router';
import {UserModel} from '../../shared/resources/user/user.model';
import {UserService} from '../../shared/resources/user/user.service';



@Injectable({providedIn: 'root'})
export class AuthenticationService {
  openModalLogin: Subject<void> = new Subject<void>();
  public currentUserSubject: BehaviorSubject<UserModel>;
  public currentUser: Observable<UserModel>;


  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.currentUserSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public loginFromLocalStorage(): void {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
      this.testTokenIsValid();
    }
  }

  public get currentUserValue(): UserModel {
    if (this.testTokenIsValid()) {
      return this.currentUserSubject.value;
    }
  }

  testTokenIsValid(openModalLogin: boolean = false): boolean {
    if (!this.getCurrentUser('expiresAt')) {
      return true;
    }

    // const dataNow = moment().format('YYYY-MM-DD HH:mm:ss');
    const expiresAt = this.getCurrentUser('expiresAt');
    const test = false; // expiresAt > dataNow;

    if (expiresAt && !test) {
      this.logout(false);
    } else if (!expiresAt && openModalLogin) {
      this.loginWithModal();
    }
    return test;
  }

  setTokenAndGetLoginInfo(token): void {
    this.userService.loginInfo(token).subscribe(
      user => this.updateCurrentUser(user, true)
    );
  }

  login(credentials): void {
    this.userService.login(credentials).subscribe(
      user => {
        console.log('user1', user);
        this.updateCurrentUser(user);
      },
      error => {
        console.log('error', error.error[0]);
        // toastr.error('Cliente não encontrado!');
      }
    );
  }

  loginSocial(userProvider: any): void {
    this.userService.loginSocial(userProvider).subscribe(
      user => this.updateCurrentUser(user, true)
    );
  }

  updateCurrentUser(user: UserModel, navigation = false): UserModel {

    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
    if (navigation) {
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      this.router.navigate([returnUrl]);
    }

    return user;
  }

  logoutTest(): void {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    // window.location.reload();
  }

  logout(navigate = true): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);

    if (navigate) {
      this.router.navigate(['/login']);
    }
  }

  isLoggedIn(openModalLogin: boolean = false): boolean {
    this.testTokenIsValid(openModalLogin);
    return this.getToken() !== null;
  }

  getCurrentUser(filter = null): any {

    // const user = localStorage.getItem('currentUser');
    const user = this.currentUserSubject.getValue();
    if (user) {
      if (filter) {
        return (user)[filter];
      }
      return user;
    }
    return null;
  }

  getToken(): string | null {
    const currentUser = this.currentUserSubject.getValue();

    // const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      return currentUser.token;
    }
    return null;
  }

  public loginWithModal(): void {
    console.log('loginWithModal');
    this.openModalLogin.next();
  }

  getNavbarPermission(menuValue: number): boolean {
    return true;
    // if (this.isLoggednIn()) {
    //   this.userNavbarValue = (this.getCurrentUser().permission.filter(navbarPermission => navbarPermission.module === 'nav'))[0].value;
    //   // tslint:disable-next-line:no-bitwise
    //   if ((this.userNavbarValue & menuValue) > 0) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // }
  }


}
