import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConsultFormComponent} from './consult-form/consult-form.component';
import {ConsultListComponent} from './consult-list/consult-list.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Consultas'
    },
    children: [
      {path: '', component: ConsultListComponent},
      {path: 'new', component: ConsultFormComponent},
      // {path: ':id/edit', component: ConsultFormComponent},
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ConsultRoutingModule {
}
