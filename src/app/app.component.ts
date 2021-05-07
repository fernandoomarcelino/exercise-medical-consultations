import {Component, Injector, OnInit} from '@angular/core';
import {LoadingService} from './core/services/loading.service';
import {AuthenticationService} from './core/services/authentication.service';
import {NavigationEnd, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'exercise-medical-consultations';

  loadingService: LoadingService;
  authenticationService: AuthenticationService;

  constructor(
    private router: Router,
    protected injector: Injector,
    private spinner: NgxSpinnerService,
  ) {
    this.loadingService = this.injector.get(LoadingService);
    this.authenticationService = this.injector.get(AuthenticationService);
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    this.loadingService.currentLoadingRequests.subscribe((requests) => {
      if (requests > 0) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }
    });

  }

}
