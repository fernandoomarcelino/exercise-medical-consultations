import {Component, Injector, OnInit} from '@angular/core';
import {BaseResourceListComponentDirective} from '../../../shared/components/base-resource-list/base-resource-list-component.directive';
import {ConsultModel} from '../../../shared/resources/consult/consult.model';
import {ConsultService} from '../../../shared/resources/consult/consult.service';


@Component({
  selector: 'app-consult-list',
  templateUrl: 'consult-list.component.html',
  styleUrls: ['consult-list.component.scss']
})
export class ConsultListComponent extends BaseResourceListComponentDirective<ConsultModel> implements OnInit {

  constructor(
    protected injector: Injector,
    protected consultService: ConsultService,
  ) {
    super(injector, consultService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

}
