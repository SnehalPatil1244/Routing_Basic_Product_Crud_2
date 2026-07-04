import { Component, OnInit } from '@angular/core';
import { Iuser } from '../../model/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
UserArr : Iuser[] = []
  constructor(private userservice : UserService) { }

  ngOnInit(): void {
    this.getusers()
  }

  getusers(){
    this.userservice.fetchuser().subscribe({
      next : res =>{
        this.UserArr = res
      },
      error : err =>{
        console.log(err);
        
      }
    })
    
  }

}
