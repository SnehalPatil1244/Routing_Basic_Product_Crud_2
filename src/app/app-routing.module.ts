import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Shared/components/home/home.component';
import { UserComponent } from './Shared/components/users/user.component';
import { ProductComponent } from './Shared/components/product/product.component';
import { FairsComponent } from './Shared/components/fairs/fairs.component';
import { ProductDashboardComponent } from './Shared/components/product-dashboard/product-dashboard.component';
import { ProductFormComponent } from './Shared/components/product-form/product-form.component';
import { UserDashboardComponent } from './Shared/components/user-dashboard/user-dashboard.component';
import { UserFormComponent } from './Shared/components/user-form/user-form.component';
import { FairsDashBoardComponent } from './Shared/components/fairs-dash-board/fairs-dash-board.component';
import { FairsDetailsComponent } from './Shared/components/fairs-details/fairs-details.component';
import { AuthComponent } from './Shared/components/auth/auth.component';
import { HomepageComponent } from './Shared/components/homepage/homepage.component';
import { AuthGuard } from './Shared/services/Auth.Guard';
import { canDeactivateComponent } from './Shared/services/canDeactivate.Guard';
import { userRoleGuard } from './Shared/services/UserRole.Guard';
import { productResolver } from './Shared/services/product.resolver';
import { newproductResolver } from './Shared/services/New-Product.resolver';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent
  },
  {
    path: 'home',
    component: HomepageComponent,
    canActivate: [AuthGuard, userRoleGuard],
    data: {
      userRole: ['buyer', 'admin', 'superAdmin']
    }
  },

  {
    path: 'users',
    component: UserDashboardComponent,
    canActivate: [AuthGuard, userRoleGuard],
    data: {
      userRole: ['admin', 'superAdmin']
    },
    children: [
      {
        path: 'adduser',
        component: UserFormComponent
      },
      {
        path: ':userId',
        component: UserComponent
      },
      {
        path: ':userId/edit',
        component: UserFormComponent,
        canDeactivate: [canDeactivateComponent]
      },
    ]
  },


  {
    path: 'products',
    component: ProductDashboardComponent,
    canActivate: [AuthGuard, userRoleGuard],
    data: {
      userRole: ['buyer', 'admin', 'superAdmin']
    },
    resolve: {
      products: productResolver
    },
    children: [
      {
        path: 'addproduct',
        component: ProductFormComponent
      },
      {
        path: ':productId',
        component: ProductComponent,
        resolve: {
          products: newproductResolver
        }
      },
      {
        path: ':productId/edit',
        component: ProductFormComponent,
        canDeactivate: [canDeactivateComponent]
      },
    ]
  },
  {
    path: 'fairs',
    component: FairsDashBoardComponent,
    canActivate: [AuthGuard, userRoleGuard],
    data: {
      userRole : ['superAdmin']
    },
    children: [
      {
        path: ':fairsId',
        component: FairsDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
