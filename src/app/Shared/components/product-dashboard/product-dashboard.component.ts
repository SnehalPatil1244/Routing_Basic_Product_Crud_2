import { Component, OnInit } from '@angular/core';
import { Iproduct } from '../../model/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.scss']
})
export class ProductDashboardComponent implements OnInit {
 products : Array<Iproduct> = []
  constructor(private productservice : ProductService,
              private route : ActivatedRoute
   
  ) { this.products = this.route.snapshot.data['products']}

  ngOnInit(): void {
    // this.productservice.fetchproducts().subscribe({
    //   next : data =>{
    //     this.products = data
    //   },
    //   error : err =>{
    //     console.log(err);
        
    //   }
    // })
  }

  trackByFun(index : number, product : Iproduct){
    return product.pid

  }

}
