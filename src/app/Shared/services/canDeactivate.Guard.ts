import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Icandeactivate } from "../model/canDeactivate";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class canDeactivateComponent implements CanDeactivate<Icandeactivate> {
    canDeactivate(component: Icandeactivate, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return component.canDeactivate()
    }
}