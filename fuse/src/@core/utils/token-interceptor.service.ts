import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { AuthState } from '../store/auth/auth.state';
import { Logout } from '../store/auth/auth.actions';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private _store: Store) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this._store.selectSnapshot(AuthState.token)}`
      }
    });
    // next.handle returns an observable
    // which we can pipe other operators onto.
    // We use pipe and tap in RxJS 6, but this
    // would have been the `do` operator previously
    return next.handle(request).pipe(
      tap(
        (response: HttpEvent<any>) => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              // if the request is unauthorized,
              // make the user log in again
             // this._store.dispatch(new Logout); //should get caught in main app component and redirected 
            }
          }
        }
      )
    );
  }
}
