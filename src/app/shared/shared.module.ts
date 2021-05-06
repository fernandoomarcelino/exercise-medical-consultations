import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';


import {FormFieldErrorComponent} from './components/form-field-error/form-field-error.component';
import {ServerErrorMessagesComponent} from './components/server-error-messages/server-error-messages.component';
import {PageHeaderComponent} from './components/page-header/page-header.component';
import {ModalConfirmComponent} from './components/modal-confirm/modal-confirm.component';
import {MatDialogModule} from '@angular/material/dialog';

// FlexLayout
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,

    // Material
    MatDialogModule,
    // Material

    // Flex layout
    FlexLayoutModule,
  ],
  declarations: [
    // BreadCrumbComponent,
    // ModalLoginComponent,
    PageHeaderComponent,
    FormFieldErrorComponent,
    ServerErrorMessagesComponent,
    ModalConfirmComponent
  ],
  exports: [
    // my-account modules
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,


    FormFieldErrorComponent,
    ServerErrorMessagesComponent,
    ModalConfirmComponent,

    // Material
    MatDialogModule,
    // Material

    // Flex layout
    FlexLayoutModule,

  ],
  providers: [],
  entryComponents: []
})
export class SharedModule {
}
