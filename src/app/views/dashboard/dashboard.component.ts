import {Component, Injector, OnInit} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../shared/resources/user/user.service';
import {AuthenticationService} from '../../core/services/authentication.service';
import {UserModel} from '../../shared/resources/user/user.model';
import {BaseResourceFormComponentDirective} from '../../shared/components/base-resource-form/base-resource-form-component.directive';
import {ScheduleModel} from '../../shared/resources/schedule/schedule.model';
import {ScheduleService} from '../../shared/resources/schedule/schedule.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent extends BaseResourceFormComponentDirective<ScheduleModel> implements OnInit {

  constructor(
    protected scheduleService: ScheduleService,
    protected injector: Injector,
    public authenticationService: AuthenticationService,
  ) {
    super(injector, new ScheduleModel(), scheduleService, ScheduleModel.fromJson);
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.currentAction = 'new';
    super.ngOnInit();
  }

}
