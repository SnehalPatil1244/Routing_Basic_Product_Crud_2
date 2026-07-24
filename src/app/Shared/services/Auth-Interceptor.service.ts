import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { finalize, Observable } from "rxjs";
import { SpinnerService } from "./spinner.service";


@Injectable({
    providedIn: "root"
})
export class AuthInterceptor implements HttpInterceptor {
    private spinnerservice = inject(SpinnerService)
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinnerservice.emitLoadingFlag$(true)
        if (req.url.includes('login') || req.url.includes('signUp')) {
            return next.handle(req).pipe(
                finalize(() => {
                    this.spinnerservice.emitLoadingFlag$(false)
                })
            )
        }
        const reqclone = req.clone({
            setHeaders: {
                "content-type": "Application/json",
                "auth": "token"
            }
        })
        return next.handle(reqclone).pipe(
            finalize(() => {
                this.spinnerservice.emitLoadingFlag$(false)
            })
        )

    }

}