import { Component, OnInit } from '@angular/core';
import { Ifairs } from '../../model/fairs';
import { FairsService } from '../../services/fairs.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-fairs-details',
  templateUrl: './fairs-details.component.html',
  styleUrls: ['./fairs-details.component.scss']
})
export class FairsDetailsComponent implements OnInit {
  fairId !: string
  fairObj !: Ifairs

  constructor(private fairservice: FairsService,
    private routes: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.routes.paramMap.subscribe( params => {
       this.fairId = params.get('fairsId')!
       console.log(this.fairId);
       
      if (this.fairId) {
        this.fairservice.fetchfairsById(this.fairId).subscribe({
          next: res => {
            this.fairObj = res
          },
          error: err => {
            console.log(err);

          }
        })
      }
    })
  }
}
