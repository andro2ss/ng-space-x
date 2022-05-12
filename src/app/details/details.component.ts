import { Component, OnInit } from '@angular/core';
import { SpaceX } from '../models/spaceXList.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SpacexListService } from '../services/spacex-list.service';
import { GetDetailDataLaunchPadService } from '../services/get-detail-data-launch-pad.service';
import { GetDetailDataRocketService } from '../services/get-detail-data-rocket.service';

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
  photoNum: number = 1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private spaceXListService: SpacexListService,
    private getDetailDataLaunchPadService: GetDetailDataLaunchPadService,
    private getDetailDataRocketService: GetDetailDataRocketService
  ) {}

  handleBack() {
    this.router.navigate(['../'], {
      relativeTo: this.route,
    });
  }

  handleChangePhoto(direction: string) {
    if (this.flightGallery) {
      if (direction === '<') {
        let tempPhoto = this.flightGallery.pop();
        if (tempPhoto) {
          this.flightGallery.unshift(tempPhoto);
        }
        this.photoNum -= 1;
        if (this.photoNum < 1) {
          this.photoNum = this.flightGallery.length;
        }
      } else {
        let tempPhoto = this.flightGallery.shift();
        if (tempPhoto) {
          this.flightGallery.push(tempPhoto);
        }
        this.photoNum += 1;
        if (this.photoNum > this.flightGallery.length) {
          this.photoNum = 1;
        }
      }
    }
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
