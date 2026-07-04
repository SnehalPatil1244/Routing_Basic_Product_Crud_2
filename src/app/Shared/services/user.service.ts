import { Injectable } from '@angular/core';
import { Iuser } from '../model/user';
import { Observable, of } from 'rxjs';
import { Ires } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  UsersDetails: Array<Iuser> = [
    {
      userName: 'Rohit Yewale',
      userId: 'EMP101',
      userRole: 'Candidate',
      profileDescription: '3 years of experience in Angular development.',
      profileImage: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      skills: ['Angular', 'TypeScript', 'RxJS', 'Bootstrap'],
      experienceYears: '1 to 3 years',
      isActive: true,
      address: {
        current: {
          city: 'Pune',
          state: 'Maharashtra',
          country: 'India',
          zipcode: '411001'
        },
        permanent: {
          city: 'Kolhapur',
          state: 'Maharashtra',
          country: 'India',
          zipcode: '416001'
        }
      },
      isAddSame: false
    },
    {
      userName: 'Snehal Patil',
      userId: 'EMP102',
      userRole: 'Admin',
      profileDescription: 'Experienced in Angular and responsive UI development.',
      profileImage: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      skills: ['Angular', 'HTML', 'CSS', 'JavaScript'],
      experienceYears: '3 to 5 years',
      isActive: true,
      address: {
        current: {
          city: 'Mumbai',
          state: 'Maharashtra',
          country: 'India',
          zipcode: '400001'
        },
        permanent: {
          city: 'Satara',
          state: 'Maharashtra',
          country: 'India',
          zipcode: '415001'
        }
      },
      isAddSame: true
    }
  ];

  constructor() { }

  fetchuser(): Observable<Array<Iuser>> {
    return of(this.UsersDetails)
  }

  fetchuserById(id: string): Observable<Iuser> {
    let UserObj = this.UsersDetails.find(u => u.userId === id)!
    return of(UserObj)
  }

  onadduser(user: Iuser): Observable<Ires<Iuser>> {
    this.UsersDetails.push(user)
    return of({
      msg: `The USer With Id ${user.userId} Is Added Successfully !!!`,
      data: user
    })

  }
  onremoveuser(id: string) {
    let getindex = this.UsersDetails.findIndex(u => u.userId === id)
    let user = this.UsersDetails.splice(getindex, 1)
    return of({
      msg: `The User With Id ${user[0].userId} Is Removed Successfully !!`,
      data: user[0]
    })
  }

  onuserUpdate(updatedobj : Iuser) : Observable<Ires<Iuser>>{
    let getindex = this.UsersDetails.findIndex(u => u.userId === updatedobj.userId)
    this.UsersDetails[getindex] = updatedobj
    return of({
      msg : `The User With Id ${updatedobj.userId} Is Updated Successfully !!`,
      data : updatedobj
    })
  }
}
