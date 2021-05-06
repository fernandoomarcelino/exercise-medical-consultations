import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './core/guards/auth.guard';
import {P404Component} from './views/error/404.component';
import {P500Component} from './views/error/500.component';
import {AuthContainerComponent} from './containers/auth-container/auth-container.component';
import {NotAuthGuard} from './core/guards/not-auth.guard';

export const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'dashboard',
  //   canActivate: [AuthGuard],
  //   pathMatch: 'full',
  // },
  {
    path: 'login',
    redirectTo: 'auth/login',
    // canActivate: [NotAuthGuard],
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },

  {
    path: 'auth',
    canActivate: [NotAuthGuard],
    component: AuthContainerComponent,
    loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule),
  },

  {path: '**', component: P404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
