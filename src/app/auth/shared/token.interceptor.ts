import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(public authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // const token = (JSON.stringify(this.authService.getToken())).substring(3, 207)
        const token = this.authService.getToken()
        if (token) {
            req = req.clone({
                setHeaders: {
                    Authorization: 'bearer ' + token
                }
            })
        }

        return next.handle(req)
    }
}