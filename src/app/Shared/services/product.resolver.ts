import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Iproduct } from "../model/product";
import { Observable } from "rxjs";
import { inject, Injectable } from "@angular/core";
import { ProductService } from "./product.service";

@Injectable({
    providedIn : "root"
})
export class productResolver implements Resolve<Iproduct[]> {
    private productservice = inject(ProductService)
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Iproduct[] | Observable<Iproduct[]> | Promise<Iproduct[]> {
        return this.productservice.fetchproducts()
    }

}