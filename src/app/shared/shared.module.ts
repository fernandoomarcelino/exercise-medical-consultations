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
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {MatChipsModule} from '@angular/material/chips';
import {MatBadgeModule} from '@angular/material/badge';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatTableModule} from '@angular/material/table';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,

    // Material,
    MatSliderModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatDialogModule,
    MatChipsModule,
    MatBadgeModule,
    DragDropModule,
    MatTableModule,
    MatFormFieldModule,
    MatGridListModule,
    MatAutocompleteModule,
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

    PageHeaderComponent,
    FormFieldErrorComponent,
    ServerErrorMessagesComponent,
    ModalConfirmComponent,

    // Material,
    MatSliderModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatDialogModule,
    MatChipsModule,
    MatBadgeModule,
    DragDropModule,
    MatTableModule,
    MatFormFieldModule,
    MatGridListModule,
    MatAutocompleteModule,
    // Material

    // Flex layout
    FlexLayoutModule,

  ],
  providers: [],
  entryComponents: []
})
export class SharedModule {
}
