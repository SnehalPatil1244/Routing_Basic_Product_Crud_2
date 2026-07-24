import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
private isLoading$ : BehaviorSubject<boolean> = new BehaviorSubject(false)
isLoadingObs$ = this.isLoading$.asObservable()
  constructor() { }
  emitLoadingFlag$(flag : boolean){
    this.isLoading$.next(flag)
  }
}
