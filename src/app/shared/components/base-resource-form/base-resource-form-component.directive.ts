import {AfterContentChecked, AfterViewInit, Directive, Injector, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';


import {switchMap} from 'rxjs/operators';
import {BaseResourceModel} from '../../resources/base-resource/base-resource.model';
import {BaseResourceService} from '../../resources/base-resource/base-resource.service';
import {MatDialog} from '@angular/material/dialog';
import {ModalConfirmComponent} from '../modal-confirm/modal-confirm.component';
import {ToastrService} from 'ngx-toastr';


@Directive()
export abstract class BaseResourceFormComponentDirective<T extends BaseResourceModel>
  implements OnInit, AfterContentChecked, AfterViewInit {
  currentAction: string;
  resourceForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm = false;
  selectedEdition: any = null;

  resources: T[];
  selectedResource: T = null;
  isCollapsed = true;
  iconCollapsed = 'fa fa-plus';

  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;
  public dialog: MatDialog;
  public toastr: ToastrService;

  protected constructor(
    protected injector: Injector,
    public resource: T,
    protected resourceService: BaseResourceService<T>,
    protected jsonDataToResourceFn: (jsonData) => T,
    protected navigation = true,
    protected navigationReturnTo = 'list',
  ) {
    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.formBuilder = this.injector.get(FormBuilder);
    this.dialog = this.injector.get(MatDialog);
    this.toastr = this.injector.get(ToastrService);
  }

  ngOnInit(paramLoadResource: string = ''): void {
    this.setCurrentAction();
    this.buildResourceForm();
    this.loadResource(paramLoadResource);
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  ngAfterViewInit(): void {
  }

  protected prepareToSubmit(): void {
  }

  submitForm(): void {
    this.prepareToSubmit();
    this.submittingForm = true;

    if (this.resourceForm.invalid) {
      return this.alertInvalidForm();
    }

    this.createOrUpdateResource();
  }

  alertInvalidForm(): void {
    this.toastr.info('Campos inválido! Verifique antes de prosseguir.');
    return this.resourceForm.markAllAsTouched();
  }

  // PRIVATE METHODS

  protected setCurrentAction(): void {
    if (!this.currentAction) {
      const lastUrl = this.route.snapshot.url.length - 1;
      if (lastUrl < 0 || this.route.snapshot.url[lastUrl].path.substring(0, 3) === 'new') {
        this.currentAction = 'new';
      } else {
        this.currentAction = 'edit';
      }
    }
  }

  public getId(): number | null {
    return this.route.snapshot.params.id;
  }

  protected loadResource(paramLoadResource: string = ''): void {
    if (this.currentAction === 'edit') {
      this.selectedEdition = this.getId();

      // +params.get('id')
      this.route.paramMap.pipe(
        switchMap(params => this.resourceService.getById(this.selectedEdition, paramLoadResource)),
      )
        .subscribe
        (
          (resource) => {
            this.resource = resource;
            // this.dataProcessingFromServer();
            // this.resourceForm.get('name').valueChanges.subscribe(console.log); // => DEBUG
            this.resourceForm.patchValue(resource); // binds loaded resource data to resourceForm
            this.actionsForSuccessOnLoadResource(resource);
          },
          (error) => this.loadResourceactionsForError(error)
        );
    }
  }

  protected loadResourceactionsForError(error): void {
  }

  protected setPageTitle(): void {
    if (this.currentAction === 'new') {
      this.pageTitle = this.creationPageTitle();
    } else {
      this.pageTitle = this.editionPageTitle();
    }
  }

  protected creationPageTitle(): string {
    return 'Novo';
  }

  protected editionPageTitle(): string {
    return 'Edição';
  }


  protected createOrUpdateResource(): void {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
    this.resourceService.createOrUpdate(resource)
      .subscribe(
        resource2 => {
          this.resource = resource2;
          this.resourceForm.patchValue(resource2);
          this.actionsForSuccess(resource2);
        },
        error => this.actionsForError(error)
      )
      .add(() => this.submittingForm = false);
  }

  protected createResource(): void {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
    this.resourceService.createOrUpdate(resource)
      .subscribe(
        resource2 => this.actionsForSuccess(resource2),
        error => this.actionsForError(error)
      )
      .add(() => this.submittingForm = false);
  }

  protected updateResource(): void {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
    this.resourceService.createOrUpdate(resource)
      .subscribe(
        resource2 => this.actionsForSuccess(resource2),
        error => this.actionsForError(error)
      )
      .add(() => this.submittingForm = false);
  }

  protected actionsForSuccessOnLoadResource(resource): void {
  }

  protected actionsForSuccess(resource: T): void {
    this.toastr.success('Solicitação processada com sucesso!');
    if (this.navigation) {
      this.actionsForSuccessNavigation(resource);
    }
  }

  protected actionsForSuccessNavigation(resource: T, returnTo: string = this.navigationReturnTo): void {
    if (!['new', 'edit', 'list'].includes(returnTo)) {
      return alert('Erro configuração retorno.');
    }
    let baseComponentPath: string = this.router.url;
    // console.log(baseComponentPath);
    // console.log('this.route.snapshot.routeConfig.path', this.route.snapshot.routeConfig.path);
    // let baseComponentPath: string = this.route.snapshot.parent.url[0].path;
    if (this.route.snapshot.routeConfig.path === 'new') {
      baseComponentPath = baseComponentPath.substring(0, baseComponentPath.lastIndexOf('/'));

    } else if (this.route.snapshot.routeConfig.path === ':id/edit') {
      baseComponentPath = baseComponentPath.substring(0, baseComponentPath.lastIndexOf('/'));
      baseComponentPath = baseComponentPath.substring(0, baseComponentPath.lastIndexOf('/'));

    } else if (this.route.snapshot.routeConfig.path === 'edit') {
      baseComponentPath = baseComponentPath.substring(0, baseComponentPath.lastIndexOf('/'));
      baseComponentPath = baseComponentPath.substring(0, baseComponentPath.lastIndexOf('/'));

    } else {
      this.router.navigateByUrl(baseComponentPath, {skipLocationChange: true}).then(
        () => this.router.navigate([baseComponentPath])
      );
      return;
    }
    if (returnTo === 'edit') {
      this.router.navigateByUrl(baseComponentPath, {skipLocationChange: true}).then(
        () => this.router.navigate([baseComponentPath, resource.id, 'edit'])
      );
    } else if (returnTo === 'new') {
      this.router.navigateByUrl(baseComponentPath, {skipLocationChange: true}).then(
        () => this.router.navigate([baseComponentPath, 'new'])
      );
    } else if (returnTo === 'list') {
      this.router.navigateByUrl(baseComponentPath, {skipLocationChange: true});
    }

  }


  protected actionsForError(error): void {
    this.submittingForm = false;

    if (error.status === 422) {
      this.serverErrorMessages = JSON.parse(error._body).errors;
    } else {
      this.serverErrorMessages = ['Falha na comunicação com o servidor. Por favor, tente mais tarde.'];
    }
  }

  protected abstract buildResourceForm(): void;

  public toggleCollapse(closed = null, clear = false): void {
    if (closed === null) {
      this.isCollapsed = !this.isCollapsed;
    } else {
      this.isCollapsed = closed;
    }
    if (clear) {
      this.selectOrDeselectResource(null, false);
      this.selectedResource = null;
    }
    this.iconCollapsed = this.isCollapsed ? 'fa fa-plus' : 'fa fa-minus';
  }

  public selectResourceOfResources(card: T): void {
    if (this.selectedResource == card) {
      this.selectedResource = null;
    } else {
      this.selectedResource = card;
    }

    this.toggleCollapse(!this.selectedResource);
  }

  public testIfResourceIsSelected(resource): boolean {
    return (resource && this.resourceForm.value.id === resource.id);
  }

  public selectOrDeselectResource(resource, forceSelectOrDeselect = null): void {
    if (forceSelectOrDeselect === false || (forceSelectOrDeselect === null && this.testIfResourceIsSelected(resource))) {
      this.clearResourcerForm();
    } else {
      this.selectResource(resource);
    }
  }

  public selectResource(resource): void {
    this.resource = resource;
    this.resourceForm.patchValue(resource);
  }

  public clearResourcerForm(): void {
    this.resourceForm.clearValidators();
    this.resourceForm.reset();
  }

  public findInArrayById(array, id): void {
    return array.find(el => el.id === id);
  }

  public getDatatablesSelectds(resources, rows, id = 'id'): [] {
    console.log('resources', resources);
    console.log('rows', rows);
    console.log('id', id);
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
      // return this.confirmAfterDeleteResource(resource, useResources);
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
    this.toastr.error('Erro ao tentar excluir');
  }


}
