import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Iproduct } from "../model/product";
import { Observable } from "rxjs";
import { inject, Injectable } from "@angular/core";
import { ProductService } from "./product.service";

@Injectable({
    providedIn: "root"
})
export class newproductResolver implements Resolve<Iproduct | Iproduct[]> {
    private productservice = inject(ProductService)
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Iproduct | Iproduct[] | Observable<Iproduct | Iproduct[]> | Promise<Iproduct | Iproduct[]> {
        let productId = route.paramMap.get('productId')
        if (productId) {
            return this.productservice.fetchproductById(productId)

        } else {
            return this.productservice.fetchproducts()
        }

    }

}