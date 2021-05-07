import {Component, Injector, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {UserService} from '../../../shared/resources/user/user.service';
import {UserModel} from '../../../shared/resources/user/user.model';
import {BaseResourceFormComponentDirective} from '../../../shared/components/base-resource-form/base-resource-form-component.directive';
import {MustMatch} from '../../../shared/directives/must-match.directive';


@Component({
  selector: 'app-sign-up',
  templateUrl: 'sign-up.component.html',
  styleUrls: ['sign-up.component.scss']
})
export class SignUpComponent extends BaseResourceFormComponentDirective<UserModel> implements OnInit {
  loading = false;
  submitted = false;
  error = '';

  private loggedIn: boolean;
  showPassword = false;
  remindPassword = true;

  constructor(
    protected userService: UserService,
    protected injector: Injector,
  ) {
    super(injector, new UserModel(), userService, UserModel.fromJson);
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
        name: [null, [Validators.required]],
        username: [null, [Validators.required]],
        email: [null, [Validators.required]], // Validators.email
        password: [null, [Validators.required]],
        password_confirmation: [null, [Validators.required]],
      },
      {
        validator: [MustMatch('password', 'password_confirmation', 'password')]
      });
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  public showPasswordFn(): void {
    this.showPassword = !this.showPassword;
  }

  public remindPasswordFn(): void {
    this.remindPassword = !this.remindPassword;
  }

  public cancel(): void {
    this.router.navigateByUrl('auth/login');
  }

  protected actionsForSuccess(resource: UserModel): void {
    this.toastr.success('Usuário cadastrado com sucesso. Faça seu login para poder utilizar o sistema.');
    this.cancel();
  }

}
