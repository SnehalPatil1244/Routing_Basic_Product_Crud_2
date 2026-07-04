import { Component, OnInit } from '@angular/core';
import { FairsService } from '../../services/fairs.service';
import { Ifairs } from '../../model/fairs';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@Component({
  selector: 'app-fairs-dash-board',
  templateUrl: './fairs-dash-board.component.html',
  styleUrls: ['./fairs-dash-board.component.scss'],
 
})
export class FairsDashBoardComponent implements OnInit {
  fairsArr: Ifairs[] = []
  constructor(private fairsservice: FairsService) { }

  ngOnInit(): void {
    this.getfairsdetails()
  }

  getfairsdetails() {
    this.fairsservice.fetchfairs().subscribe({
      next: res => {
        this.fairsArr = res
      },
      error: err => {
        console.log(err);

      }
    })
  }
}


