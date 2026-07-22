import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { FairsService } from '../../services/fairs.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  userRole !: string

  constructor(private userservice: UserService,
    private productservice: ProductService,
    private fairservice: FairsService,
    private router: Router,
    private authservice: AuthService
  ) { }

  ngOnInit(): void {
    this.userRole = this.authservice.getUserRole()!
    this.authservice.isLoging$.subscribe({
      next : res => {
        this.userRole = res
      }
    })
  }

  ongoproducts() {
    this.productservice.fetchproducts().subscribe(res => {
      this.router.navigate(['/products', res[0].pid], {
        queryParams: { cr: res[0].canReturn }
      })
    })

  }
  ongousers() {
    this.userservice.fetchuser().subscribe(res => {
      this.router.navigate(['/users', res[0].userId], {
        queryParams: { cr: res[0].userRole }
      })

    })

  }

  gettofairs() {
    this.fairservice.fetchfairs().subscribe(res => {
      this.router.navigate(['/fairs', res[0].fairId])
    })
  }

  onlogout() {
    this.authservice.LogOut()
    this.router.navigate([''])

  }
}
