import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './Shared/components/product/product.component';
import { ProductDashboardComponent } from './Shared/components/product-dashboard/product-dashboard.component';
import { ProductFormComponent } from './Shared/components/product-form/product-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './Shared/components/home/home.component';
import { UserComponent } from './Shared/components/users/user.component';
import { FairsComponent } from './Shared/components/fairs/fairs.component';
import { NavBarComponent } from './Shared/components/nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { GetConfirmationComponent } from './Shared/components/get-confirmation/get-confirmation.component';
import { UserDashboardComponent } from './Shared/components/user-dashboard/user-dashboard.component';
import { UserFormComponent } from './Shared/components/user-form/user-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { FairsCardComponent } from './Shared/components/fairs-card/fairs-card.component';
import { FairsDetailsComponent } from './Shared/components/fairs-details/fairs-details.component';
import { FairsDashBoardComponent } from './Shared/components/fairs-dash-board/fairs-dash-board.component';
import { HomepageComponent } from './Shared/components/homepage/homepage.component';
import { AuthComponent } from './Shared/components/auth/auth.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthInterceptor } from './Shared/services/Auth-Interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductDashboardComponent,
    ProductFormComponent,
    HomeComponent,
    UserComponent,
    FairsComponent,
    NavBarComponent,
    GetConfirmationComponent,
    UserDashboardComponent,
    UserFormComponent,
    FairsCardComponent,
    FairsDetailsComponent,
    FairsDashBoardComponent,
    HomepageComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    HttpClientModule,
    MatProgressSpinnerModule
    
  ],
  providers: [{
    provide : HTTP_INTERCEPTORS,
    useClass : AuthInterceptor,
    multi : true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
