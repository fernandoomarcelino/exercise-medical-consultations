import {Injectable, Injector} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import {ModalConfirmComponent} from '../../shared/components/modal-confirm/modal-confirm.component';
import {LoadingService} from './loading.service';

@Injectable()
export class MyCustomInterceptorService implements HttpInterceptor {
  public authenticationService: AuthenticationService;
  public toastr: ToastrService;
  public dialog: MatDialog;
  protected loadingService: LoadingService;

  constructor(
    protected injector: Injector,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.authenticationService = this.injector.get(AuthenticationService);
    this.loadingService = this.injector.get(LoadingService);
    this.toastr = this.injector.get(ToastrService);
    this.dialog = this.injector.get(MatDialog);
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const cloneReq = request.clone({
      // headers: request.headers.set('Authorization', 'Bearer token')
    });
    this.loadingService.addRequestToLoading();

    // console.log('envio', cloneReq);
    return next.handle(cloneReq).pipe(
      tap((evento: HttpEvent<any>) => {
        if (evento instanceof HttpResponse) {
          this.loadingService.removeRequestToLoading();
        }
      }),
      catchError(error => {
        this.loadingService.removeRequestToLoading();
        if (error instanceof HttpErrorResponse) {

          if (error.status === 303) {
            this.dialog.open(ModalConfirmComponent, {width: '600px', data: {message: error.error?.message}});
          } else if (error.status === 0) {
            this.toastr.error('Erro de conexão com o servidor');
          } else if (error.status === 401 && error.statusText === 'Unauthorized') {
            this.toastr.error('Acesso não autorizado (token expirou?) problema a ser resolvido posteriormente. fazer login novamente.');
            this.authenticationService.logout();
          } else if (typeof error.error === 'string') {
            this.toastr.error(error.error);
          } else if (error.status === 400) {
            let msg = '<p>Dados incompletos!</p>';
            const errors = [];

            Object.keys(error.error).forEach((attributeWithError) => {
              error.error[attributeWithError].forEach(er => {
                errors.push(er);
              });
            });

            msg += '<ul><li>' + errors.join('</li><li>') + '</li></ul>';
            this.toastr.error(msg);
          } else if (error.error?.message) {
            this.toastr.error('Erro: ' + error.error.message);
          } else if (error.error?.length > 0) {
            this.toastr.error(error.error[0]);
          } else {
            this.toastr.error('Erro desconhecido! Contate o administrador do sistema.');
          }
        }
        return throwError(error);

      }));


  }
}
