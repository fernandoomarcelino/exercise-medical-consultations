import {Component, Injector, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../shared/resources/user/user.service';
import {AuthenticationService} from '../../../core/services/authentication.service';
import {UserModel} from '../../../shared/resources/user/user.model';
import {BaseResourceFormComponentDirective} from '../../../shared/components/base-resource-form/base-resource-form-component.directive';


@Component({
  selector: 'app-sign-up',
  templateUrl: 'sign-up.component.html',
  styleUrls: ['sign-up.component.scss']
})
export class SignUpComponent extends BaseResourceFormComponentDirective<UserModel> implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  private loggedIn: boolean;
  showPassword = false;
  remindPassword = true;

  constructor(
    protected userService: UserService,
    protected injector: Injector,
    public authenticationService: AuthenticationService,
  ) {
    super(injector, new UserModel(), userService, UserModel.fromJson);
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirm_password: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  login(): void {
    if (this.resourceForm.valid) {
      this.loading = true;
      const credentials = {email: this.resourceForm.value.email, password: this.resourceForm.value.password};
      this.userService.login(credentials).subscribe(
        user => this.authenticationService.updateCurrentUser(user, true),
        error => {
          if (error.status === 400) {
            this.error = 'Login e senha não conferem';
          } else if (error.status === 0) {
            this.error = 'Problemas de conexão com o servidor. Tente mais tarde';
          } else {
            this.error = 'Erro desconhecido, informe ao administrador';
          }
        },
        () => {
        }
      )
        .add(() => {
          this.loading = false;
        });
    } else {
      this.error = 'Preencher email e senha';
    }
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

}