import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule, HashLocationStrategy, LocationStrategy, registerLocaleData} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';


import br from '@angular/common/locales/pt';
import {SharedModule} from '../shared/shared.module';
import {P404Component} from '../views/error/404.component';
import {P500Component} from '../views/error/500.component';
import {AuthGuard} from './guards/auth.guard';
import {NotAuthGuard} from './guards/not-auth.guard';
import {AuthenticationService} from './services/authentication.service';
import {AuthContainerComponent} from '../containers/auth-container/auth-container.component';
import {ToastrModule} from 'ngx-toastr';
import {NgxSpinnerModule} from 'ngx-spinner';
import {LoadingService} from './services/loading.service';

const APP_CONTAINERS = [
  AuthContainerComponent
];

registerLocaleData(br);

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    // ModalModule.forRoot(),
    // CollapseModule.forRoot(),
    NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      enableHtml: true
    }),
    SharedModule,
    // IMaskModule,
    // AppAsideModule,
    // AppBreadcrumbModule.forRoot(),
    // AppFooterModule,
    // AppHeaderModule,
    // AppSidebarModule,
    // PerfectScrollbarModule,
    // DataTablesModule,
    // MatButtonModule
  ],
  declarations: [
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
  ],
  exports: [
    // my-account modules
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // CollapseModule,
    // NgxLoadingModule,
    ToastrModule,
    NgxSpinnerModule,
    // ModalModule,
    // IMaskModule,
    // DataTablesModule,

    // AppAsideModule,
    // AppFooterModule,
    // AppHeaderModule,
    // AppSidebarModule,
    // PerfectScrollbarModule,

    // my-account components
    P404Component,
    P500Component,
  ],
  providers: [
    AuthenticationService,
    AuthGuard,
    NotAuthGuard,
    LoadingService,
    ToastrModule,
    // BsModalService,
    {
      useValue: 'pt',
      // provide: LOCALE_ID,
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    {provide: LOCALE_ID, useValue: 'pt-BR'},
  ]
})
export class CoreModule {
}
