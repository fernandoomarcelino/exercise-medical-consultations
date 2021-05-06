import {NgModule} from '@angular/core';

import {SharedModule} from '../../shared/shared.module';
import {AuthRoutingModule} from './auth-routing.module';
import {SignInComponent} from './sign-up/sign-in.component';
import {SignUpComponent} from './sign-in/sign-up.component';


@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule,
  ],
  declarations: [SignInComponent, SignUpComponent],
  exports: [],
  providers: []

})


export class AuthModule {
}
