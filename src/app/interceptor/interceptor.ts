import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Router } from '@angular/router';
import { from, Observable, throwError } from 'rxjs';
import { catchError, finalize, mergeMap } from 'rxjs/operators';
import { NotificationService } from '../services/notification/notification.service';


@Injectable()
export class InterceptorService implements HttpInterceptor {
  public lastRequestTime: Date = new Date();

  constructor(private notificationService: NotificationService, private router: Router) {
    this.lastRequestTime = new Date();
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.notificationService.changeLoadingState(true);

    let authHeader: string = '';
    let cloneReq: HttpRequest<any>;

    return this.refreshAccessToken().pipe(
      mergeMap(
        (data) => {
          this.lastRequestTime = new Date();
          if (localStorage.access_token) {
            authHeader = 'Bearer ' + localStorage.access_token;
          } else {
            authHeader = '';
          }
          if ((req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') &&
            req.responseType === 'json') {
              cloneReq = req.clone({ headers: req.headers.set('Authorization', authHeader), responseType: 'json' });
          } else {
            cloneReq = req.clone({ headers: req.headers.set('Authorization', authHeader) });
          }
          console.log(cloneReq);
          return next.handle(cloneReq)
            .pipe(catchError((error: HttpErrorResponse) => this.handleError(error)));
        }
      ),
      finalize(() => this.notificationService.changeLoadingState(false))
    );
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    this.notificationService.changeLoadingState(false);
    if (error.status === 404) {
      this.notificationService.changeGrowlState('danger', 'ERROR_404');
    } else if (error.status === 401) {
      localStorage.clear();
      this.router.navigate(['/auth']);
    } else if (error.status === 403) {
      if (this.router.url !== '/auth') {
        this.notificationService.changeGrowlState('danger', 'ERROR_403');
      }
    } else if (error.status === 0 || error.status === 500) {
      this.notificationService.changeGrowlState('danger', 'ERROR_500');
    }
    return throwError(error);
  }

  private refreshAccessToken(): Observable<any> {
    return from(new Promise((resolve, reject) => {
        resolve(null);
        reject(null);
      }));
  }
}
