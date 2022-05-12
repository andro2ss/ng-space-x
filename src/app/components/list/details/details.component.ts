import { Component, OnInit } from '@angular/core';
import { SpaceX } from '../../../models/spaceXList.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SpacexListService } from '../../../services/spacex-list.service';
import { GetDetailDataLaunchPadService } from '../../../services/get-detail-data-launch-pad.service';
import { GetDetailDataRocketService } from '../../../services/get-detail-data-rocket.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  flight?: SpaceX;
  flightId: string = '';
  flightGallery?: string[];
  launchStart?: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private spaceXListService: SpacexListService,
    private getDetailDataLaunchPadService: GetDetailDataLaunchPadService,
    private getDetailDataRocketService: GetDetailDataRocketService
  ) {}

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
        this.flightGallery = this.flight?.links.flickr.original;
        if (this.flight) {
          this.getRocketData(this.flight.rocket);
          this.getLaunchpadData(this.flight.launchpad);
        }
      },
    });
  }

  private getRocketData(id: string) {
    this.getDetailDataRocketService.getDetailDataRocket(id).subscribe({
      next: response => {
        if (this.flight) {
          this.flight.rocket = response.name;
          this.flightGallery?.push(...response.flickr_images);
        }
      },
    });
  }

  private getLaunchpadData(id: string) {
    this.getDetailDataLaunchPadService.getDetailDataLaunchPad(id).subscribe({
      next: response => {
        this.launchStart = response.name;
      },
    });
  }
}
