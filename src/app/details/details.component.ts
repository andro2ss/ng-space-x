import { Component, OnInit } from '@angular/core';
import { SpaceX } from '../models/spaceXList.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SpacexListService } from '../services/spacex-list.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  flight?: SpaceX;
  flightId: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private spaceXListService: SpacexListService
  ) {}

  handleBack() {
    this.router.navigate(['../'], {
      relativeTo: this.route,
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let tempId = params.get('id');
      if (tempId !== null) {
        this.flightId = tempId;
      }
    });
    this.getSpaceXList();
  }

  private getSpaceXList() {
    this.spaceXListService.getSpaceXList().subscribe({
      next: response => {
        this.flight = response
          .filter(item => {
            return item.id === this.flightId;
          })
          .shift();
        console.log(this.flight);
      },
    });
  }
}
