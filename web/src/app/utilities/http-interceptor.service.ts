import { AppServicesService } from "./../services/app-services.service";
import { tap, catchError, map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private service: AppServicesService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const helper = new JwtHelperService();
    if (helper.isTokenExpired(this.service.getToken())) {
      // redirect to login page
    }

    if (
      request.urlWithParams != "http://localhost:3000/login" &&
      request.urlWithParams != "http://localhost:3000/signup"
    ) {
      request = request.clone({
        setHeaders: {
          Authorization: this.service.getToken(),
        },
      });
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          return event;
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status == 401) {
        } else if (error.status == 404) {
        }
        return throwError(error);
      })
    );
  }
}
