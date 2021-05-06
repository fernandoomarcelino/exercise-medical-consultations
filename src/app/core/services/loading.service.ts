import {Injectable, OnInit} from '@angular/core';


import {BehaviorSubject, Observable} from 'rxjs';


@Injectable({providedIn: 'root'})
export class LoadingService {

  private loadingRequestsSubject: BehaviorSubject<number>;
  public currentLoadingRequests: Observable<number>;

  constructor() {
    this.loadingRequestsSubject = new BehaviorSubject<number>(0);
    this.currentLoadingRequests = this.loadingRequestsSubject.asObservable();
  }

  addRequestToLoading(): void {
    let request = this.loadingRequestsSubject.value;
    request = request + 1;
    this.loadingRequestsSubject.next(request);
  }

  removeRequestToLoading(): void {
    let request = this.loadingRequestsSubject.value;
    request = request - 1;
    if (request < 0) {
      request = 0;
    }

    this.loadingRequestsSubject.next(request);
  }

}
