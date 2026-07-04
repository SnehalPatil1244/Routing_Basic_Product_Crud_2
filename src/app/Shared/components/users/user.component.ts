import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Iuser } from '../../model/user';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmationComponent } from '../get-confirmation/get-confirmation.component';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userDetails !: Iuser
  userId !: string
  constructor(private routes: ActivatedRoute,
    private router: Router,
    private snackbar: SnackbarService,
    private userserive: UserService,
    private matdialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getusers()
  }

  getusers() {
    this.routes.paramMap.subscribe(param => {
      this.userId = param.get('userId')!
      if (this.userId) {
        this.userserive.fetchuserById(this.userId)
          .subscribe({
            next: data => {
              this.userDetails = data
            },
            error: err => {
              console.log(err);

            }
          })
      }
    })

  }

  onRemove() {
    let config = new MatDialogConfig()
    config.width = '300px'
    config.disableClose = true
    config.data = `Are You Sure ? You Want To Remove This Id ${this.userId}`
    let matref = this.matdialog.open(GetConfirmationComponent, config)
    matref.afterClosed().subscribe(res => {
      if (res) {
        this.userserive.onremoveuser(this.userDetails.userId)
          .subscribe(res => {
            this.snackbar.opensnackbar(res.msg)
            this.userserive.fetchuser()
              .subscribe(res => {
                this.router.navigate(['/users', res[0].userId])
              })
          })
      }
    })

  }

}
