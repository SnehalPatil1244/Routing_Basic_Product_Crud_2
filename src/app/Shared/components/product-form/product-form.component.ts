import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Iproduct } from '../../model/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  ProductForm !: FormGroup
  isinEditmode: boolean = false
  productId !: string
  DisalbleUpdatebtn: boolean = false


  constructor(private productservice: ProductService,
    private routes: ActivatedRoute,
    private router: Router,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.createproductForm()
    this.patchproductvalue()

    this.routes.queryParams.subscribe(res => {
      if (res['cr'] == 0) {
        this.ProductForm.disable()
        this.DisalbleUpdatebtn = true

      } else {
        this.ProductForm.enable()
        this.DisalbleUpdatebtn = false
      }
    })
  }

  createproductForm() {
    this.ProductForm = new FormGroup({
      pname: new FormControl(null, [Validators.required]),
      pprice: new FormControl(null, [Validators.required]),
      pstatus: new FormControl('In-Progress'),
      pdescription: new FormControl(null, [Validators.required]),
      pimage: new FormControl(null, [Validators.required]),
      canReturn: new FormControl(1)

    })
  }

  onproductsubmit() {
    let productobj = this.ProductForm.value;
    if (this.ProductForm.invalid) {
      this.ProductForm.markAllAsTouched()
    } else {
      let product: Iproduct = {
        ...this.ProductForm.value, pid: Date.now.toString()
      }

      this.productservice.createproduct(product).subscribe({
        next: res => {
          console.log(res);
          this.ProductForm.reset()
          this.snackbar.opensnackbar(res.msg)
          this.router.navigate(['products' ,res.data.pid],{
            queryParams : { cr : res.data.canReturn}
          })

        },
        error: err => {
          console.log(err);

        }
      })
    }
  }

  patchproductvalue() {
    this.productId = this.routes.snapshot.paramMap.get('productId')!
    if (this.productId) {
      this.isinEditmode = true
      this.productservice.fetchproductById(this.productId)
        .subscribe({
          next: res => {
            this.ProductForm.patchValue(res)
          }
        })
    }
  }

  onUpdate(){
    if(this.ProductForm.invalid){
      this.ProductForm.markAllAsTouched()
    }else{
      let updatedobj : Iproduct = {
        ...this.ProductForm.value, pid : this.productId
      }
      this.productservice.onproductupdate(updatedobj).subscribe({
        next : res =>{
          this.ProductForm.reset()
          this.snackbar.opensnackbar(res.msg)
          this.isinEditmode = false
          this.router.navigate(['products', res.data.pid],{
            queryParams : {cr : updatedobj.canReturn}
          })
        },
        error : err =>{
          console.log(err);
          
        }
      })
    }
  }
}
