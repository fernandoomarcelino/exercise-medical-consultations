import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SignInComponent} from './sign-up/sign-in.component';
import {SignUpComponent} from './sign-in/sign-up.component';


const routes: Routes = [
  {
    path: 'login',
    component: SignInComponent,
  },
  {
    path: 'new',
    component: SignUpComponent,
  },
  // {
  //   path: 'login',
  //   // component: DefaultNotLoggedComponent,
  //   data: {
  //     title: 'login'
  //   },
  //   children: [
  //     {path: '', component: SignInComponent, data: {title: 'Edit'}}
  //   ]
  // },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthRoutingModule {
}
