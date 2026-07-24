import { ChangeDetectorRef, Component, inject, Inject, OnInit } from '@angular/core';
import { SpinnerService } from './Shared/services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isLoading: Boolean = false
  private spinnerservice = inject(SpinnerService)
  private cdr = inject(ChangeDetectorRef)
  title = 'Routing_Basic_Product_Crud_2';

  ngOnInit(): void {
    this.spinnerservice.isLoadingObs$.subscribe({
      next: res => {
        this.isLoading = res
        this.cdr.detectChanges()

      }
    })
  }

}
