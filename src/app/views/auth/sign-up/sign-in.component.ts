import {Component, Injector, OnInit} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../shared/resources/user/user.service';
import {AuthenticationService} from '../../../core/services/authentication.service';
import {UserModel} from '../../../shared/resources/user/user.model';
import {BaseResourceFormComponentDirective} from '../../../shared/components/base-resource-form/base-resource-form-component.directive';


@Component({
  selector: 'app-sign-in',
  templateUrl: 'sign-in.component.html',
  styleUrls: ['sign-in.component.scss']
})
export class SignInComponent extends BaseResourceFormComponentDirective<UserModel> implements OnInit {
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
      id: [null],
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.currentAction = 'new';
    super.ngOnInit();
  }

  login(): void {
    if (this.resourceForm.valid) {
      const usernameValue = this.resourceForm.value.username;
      const passwordValue = this.resourceForm.value.password;
      const credentials = {username: usernameValue, password: passwordValue};
      this.userService.login(credentials).subscribe(
        resource => {
          const user = new UserModel();
          user.username = usernameValue;
          user.password = passwordValue;
          user.token = resource.token;
          this.authenticationService.updateCurrentUser(user, true);
        },
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


  signUp(): void {
    this.router.navigateByUrl('auth/new');
  }
}
