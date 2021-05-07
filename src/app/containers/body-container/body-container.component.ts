import {Component, Injector, OnInit} from '@angular/core';
import {AuthenticationService} from '../../core/services/authentication.service';

@Component({
  selector: 'app-body-container',
  templateUrl: './body-container.component.html',
  styleUrls: ['./body-container.component.scss']
})
export class BodyContainerComponent implements OnInit {

  authenticationService: AuthenticationService;

  constructor(
    protected injector: Injector,
  ) {
    this.authenticationService = this.injector.get(AuthenticationService);
  }

  ngOnInit(): void {
  }

}
