import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SnackbarService } from '../../services/snackbar.service';
import { Router } from '@angular/router';
import { ILogin, ISingIn } from '../../model/auth';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isAllReadyHasAccount: boolean = false
  loginForm !: FormGroup
  SignUpForm !: FormGroup

  constructor(private authservice: AuthService,
    private snackbar: SnackbarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createLoginForm()
    this.createSignUpForm()
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }

  createSignUpForm() {
    this.SignUpForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      userRole: new FormControl(null, Validators.required)
    })
  }

  get l() {
    return this.loginForm.controls
  }

  get s() {
    return this.SignUpForm.controls
  }

  onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched()
    } else {
      let userdetails: ILogin = {
        ...this.loginForm.value
      }
      this.authservice.login(userdetails).subscribe({
        next: res => {
          this.snackbar.opensnackbar(res.message)
          this.authservice.saveToken(res.token)
          this.authservice.saveUserRole(res.userRole)
          this.router.navigate(['/home'])
          this.authservice.isLoging$.next(res.userRole)
        },
        error: err => {
          this.snackbar.opensnackbar(err.error.message)
        }
      })
    }

  }

  onSignup() {
    if (this.SignUpForm.invalid) {
      this.SignUpForm.markAllAsTouched()
    } else {
      let userdetails: ISingIn = {
        ...this.SignUpForm.value
      }
      this.authservice.SignIn(userdetails).subscribe({
        next: res => {
          this.snackbar.opensnackbar(res.message)
          this.isAllReadyHasAccount = true
        },
        error: err => {
          this.snackbar.opensnackbar(err.error.message)
          this.isAllReadyHasAccount = false
        }
      })
    }

  }

}
