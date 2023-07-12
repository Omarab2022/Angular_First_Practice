import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { AppStateService } from './app-state.service';


@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor( private appstate : AppStateService , ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.appstate.setProductState({
      status : "LOADING"
    })
    let req = request.clone({
      headers: request.headers.set("Autorization" ,"Bearer " )
    });

    return next.handle(req).pipe()
      finalize (()=>{
        this.appstate.setProductState({
          status : "LOADED"
        })
      
      
    })
  };
}
