import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { SnackbarService } from '../../services/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Iuser } from '../../model/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  isinEditMode: boolean = false
  UserForm !: FormGroup
  userId !: string
  edituser?: Iuser

  constructor(private userservice: UserService,
    private snackbar: SnackbarService,
    private router: Router,
    private Routes: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.createUserForm()
    this.addskillscontrol()
    this.ispermenantAddHandlers()
    this.isAddSameHandler()
    this.patchvalueinForm()
  }

  ispermenantAddHandlers() {
    this.formcontrols['address'].get('current')?.valueChanges
      .subscribe(val => {
        if (this.formcontrols['address'].get('current')?.valid) {
          this.formcontrols['isAddSame'].enable()
        } else {
          this.formcontrols['isAddSame'].reset()
          this.formcontrols['isAddSame'].disable()
        }
      })
  }

  isAddSameHandler() {
    this.formcontrols['isAddSame'].valueChanges
      .subscribe(val => {
        if (val) {
          let currentAdd = this.formcontrols['address'].get('current')?.value;
          this.formcontrols['address'].get('permanent')?.patchValue(currentAdd)
          this.formcontrols['address'].get('permanent')?.disable()
        } else if (this.isinEditMode && !val) {
          this.formcontrols['address'].get('permanent')?.patchValue(this.edituser?.address.permanent)
          this.formcontrols['address'].get('permanent')?.enable()

        }
        else {
          this.formcontrols['address'].get('permanent')?.enable()
          this.formcontrols['address'].get('permanent')?.reset()

        }
      })
  }

  createUserForm() {
    this.UserForm = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      userRole: new FormControl('Candidate'),
      profileDescription: new FormControl(null, [Validators.required]),
      profileImage: new FormControl(null, [Validators.required]),
      experienceYears: new FormControl(null, [Validators.required]),
      isActive: new FormControl(null, [Validators.required]),
      isAddSame: new FormControl({ value: null, disabled: true }),
      skills: new FormArray([]),


      address: new FormGroup({
        current: new FormGroup({
          city: new FormControl(null, [Validators.required]),
          state: new FormControl(null, [Validators.required]),
          country: new FormControl('India'),
          zipcode: new FormControl(null, [Validators.required])

        }),
        permanent: new FormGroup({
          city: new FormControl(null, [Validators.required]),
          state: new FormControl(null, [Validators.required]),
          country: new FormControl('India'),
          zipcode: new FormControl(null, [Validators.required])

        })
      })
    })
  }

  addskillscontrol() {
    if (this.skillsArr.length < 5) {
      let skillscontrol = new FormControl(null, [Validators.required])
      this.skillsArr.push(skillscontrol)
    }
  }

  get formcontrols() {
    return this.UserForm.controls
  }

  get skillsArr() {
    return this.formcontrols['skills'] as FormArray
  }

  onusersubmit() {
    if (this.UserForm.invalid) {
      this.UserForm.markAllAsTouched()
    } else {
      let userDetails = { ...this.UserForm.getRawValue(), userId: Date.now().toString() }
      this.userservice.onadduser(userDetails)
        .subscribe({
          next: res => {
            this.snackbar.opensnackbar(res.msg)
            this.router.navigate(['/users', res.data.userId])
          },
          error: err => {
            this.snackbar.opensnackbar(err.msg)

          }
        })
    }
  }


  patchvalueinForm() {
    this.userId = this.Routes.snapshot.paramMap.get('userId')!
    if (this.userId) {
      this.userservice.fetchuserById(this.userId).subscribe({
        next: res => {
          this.edituser = res
          this.isinEditMode = true
          this.UserForm.patchValue(this.edituser)
          if (res.userRole === 'Candidate') {
            this.UserForm.disable()
          }
          this.skillsArr.clear()
          this.edituser.skills.forEach(ele => {
            let control = new FormControl({
              value: ele,
              disabled: res.userRole === 'Candidate'
            })
            this.skillsArr.push(control)
          })

        }
      })
    }
  }

  onUpdate() {
    if (this.UserForm.invalid) {
      this.UserForm.markAllAsTouched()
    } else {
      let updatedobj = { ...this.UserForm.getRawValue(), userId: this.userId }
      this.userservice.onuserUpdate(updatedobj)
        .subscribe({
          next: res => {
            this.snackbar.opensnackbar(res.msg)
            this.router.navigate(['/users', res.data.userId])
          },
          error: err => {
            this.snackbar.opensnackbar(err.msg)

          }
        })
    }


  }
  onRemoveSkills(i: number) {
    this.skillsArr.removeAt(i)

  }

  canDeactivate(): boolean {
    if (this.UserForm.dirty && this.isinEditMode) {
      return confirm(`Are You Sure You Want To Discard The Changes !!`)
    }
    return true
  }
}


