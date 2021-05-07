import {AfterViewInit, Directive, Injector, OnInit} from '@angular/core';

import {BaseResourceModel} from '../../resources/base-resource/base-resource.model';
import {BaseResourceService} from '../../resources/base-resource/base-resource.service';
import {Subject} from 'rxjs';
import {ModalConfirmComponent} from '../modal-confirm/modal-confirm.component';
import {MatDialog} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';

@Directive()
export abstract class BaseResourceListComponentDirective<T extends BaseResourceModel> implements OnInit, AfterViewInit {
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  resources: T[] = [];
  autoloadResource = true;

  public dialog: MatDialog;
  public toastr: ToastrService;

  protected constructor(
    protected injector: Injector,
    private resourceService: BaseResourceService<T>,
  ) {
    this.toastr = this.injector.get(ToastrService);
    this.dialog = this.injector.get(MatDialog);
  }

  ngOnInit(param: string = ''): any {
    if (this.autoloadResource) {
      this.resourceService.getAll(param).subscribe(
        resources => {
          console.log('resources', resources)
          this.resources = resources; // .sort((a, b) => b.id - a.id)
          // this.dtTrigger.next();
          this.actionsForSuccess(resources);
        },
        error => this.actionsForError(error)
      );
    }
  }

  ngAfterViewInit(): void {
  }

  protected actionsForSuccess(resource: T[]): void {

  }

  protected actionsForError(error): void {

    if (error.error?.message) {
      this.toastr.error('Erro: ' + error.error.message);
    } else {
      this.toastr.error('Erro: ' + error.error);
    }
  }

  public getDatatablesSelectds(resources, rows, id = 'id'): any {
    const keys = [];
    rows.forEach((row, key) => {

      if (key > 0) {
        if (row.classList.contains('selected')) {
          keys.push(parseInt(row.id, 10));
        }
      }
    });
    return resources.filter(resource => keys.includes(resource[id]));
  }

  confirmAfterDeleteResource(resource: T, useResources = true): void {
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      width: '250px',
      data: {message: 'Tem certeza que deseja excluir o item?', template: 'CONFIRM'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteResource(resource, useResources, true);
      }
    });
  }

  deleteResource(resource: T, useResources = true, confirm = false): any {
    if (!confirm) {
      return this.confirmAfterDeleteResource(resource, useResources);
    }
    this.resourceService.delete(resource.id).subscribe(
      () => {
        if (useResources) {
          this.resources = this.resources.filter(element => element != resource);
        }
        this.actionsForSuccessOnDelete(resource);
      },
      () => {
        this.actionsForErrorOnDelete(resource);
      }
    );
  }

  protected actionsForSuccessOnDelete(resource: T): void {
    this.toastr.success('Excluído com sucesso!');
  }

  protected actionsForErrorOnDelete(resource: T): void {
  }

}
