import {Injectable, Injector} from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent, HttpResponse, HttpErrorResponse, HttpClient
} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

// import toastr from 'toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class MyCustomInterceptorService implements HttpInterceptor {
  public authenticationService: AuthenticationService;

  constructor(
    protected injector: Injector,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.authenticationService = this.injector.get(AuthenticationService);
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const cloneReq = request.clone({
      // headers: request.headers.set('Authorization', 'Bearer token')
    });

    // console.log('envio', cloneReq);
    return next.handle(cloneReq).pipe(
      tap((evento: HttpEvent<any>) => {
        if (evento instanceof HttpResponse) {
          // console.log('respotas', evento);
        }
      }),
      catchError(error => {
        // toastr.options = {
        //   closeButton: false,
        //   debug: false,
        //   newestOnTop: true,
        //   progressBar: true,
        //   positionClass: 'toast-top-right',
        //   preventDuplicates: true,
        //   onclick: null,
        //   showDuration: '300',
        //   hideDuration: '1000',
        //   timeOut: '50000',
        //   extendedTimeOut: '1000',
        //   showEasing: 'swing',
        //   hideEasing: 'linear',
        //   showMethod: 'fadeIn',
        //   hideMethod: 'fadeOut'
        // };

        if (error instanceof HttpErrorResponse) {

          alert('error22');
          // if (error.status === 303) {
          //   this.dialog.open(ModalConfirmComponent, {width: '600px', data: {message: error.error?.message}});
          // } else if (error.status === 0) {
          //   toastr.error('Erro de conexão com o servidor');
          // } else if (error.status === 401 && error.statusText === 'Unauthorized') {
          //   toastr.error('Acesso não autorizado (token expirou?) problema a ser resolvido posteriormente. fazer login novamente.');
          //   this.authenticationService.logout();
          // } else if (error.status === 422) {
          //   let msg = '';
          //
          //   Object.keys(error.error.errors).forEach((attributeWithError) => {
          //     error.error.errors[attributeWithError].forEach(er => {
          //       msg += '<li>' + er + '</li>';
          //     });
          //   });
          //
          //   msg = '<p>Dados incompletos!</p><ul>' + msg + '</ul>';
          //   toastr.error(msg);
          //
          // } else if (error.error?.message) {
          //   toastr.error('Erro: ' + error.error.message);
          // } else if (error.error?.length > 0) {
          //   toastr.error(error.error[0]);
          // } else {
          //   toastr.error('Erro desconhecido! Contate o administrador do sistema.');
          // }
        }
        return throwError(error);

      }));


  }
}
