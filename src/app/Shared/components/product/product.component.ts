import { Component, OnInit } from '@angular/core';
import { Iproduct } from '../../model/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmationComponent } from '../get-confirmation/get-confirmation.component';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  productobj !: Iproduct
  productId !: string

  constructor(private productservice: ProductService,
    private router: Router,
    private routes: ActivatedRoute,
    private matdialog : MatDialog,
    private snackbar : SnackbarService
  ) { }

  ngOnInit(): void {
    this.getproducts()
  }

  getproducts() {
    this.routes.paramMap.subscribe(param => {
      this.productId = param.get('productId')!
      if(this.productId){
        this.productservice.fetchproductById(this.productId).subscribe({
          next : data => {
            this.productobj = data
          }
        })
      }
    })

  }

  redirectTOEdit() {
    this.router.navigate(['/products', this.productId, 'edit'],{
      queryParamsHandling : 'preserve',
      relativeTo : this.routes
    })

  }

  onRemove() {
   let config =  new MatDialogConfig()
   config.width = '300px'
   config.disableClose = true
   config.data = `Are You Sure ? You Want To Remove This ID ${this.productId}`
   let matref = this.matdialog.open(GetConfirmationComponent, config)
   matref.afterClosed().subscribe(res =>{
    if(res){
      this.productservice.onRemoveproduct(this.productId).subscribe({
        next : res =>{
          this.snackbar.opensnackbar(res.msg)
          this.productservice.fetchproducts().subscribe({
            next : res => {
               this.router.navigate(['/products', res[0].pid],{
                queryParams : {cr : res[0].canReturn}
               })

            }
          })
         
        },
        error : err =>{
          console.log(err);
          
        }
      })
    }
   })



  }

}
