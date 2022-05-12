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
  flightGallery?: string[];
  photoNum: number = 1;

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
        console.log(this.flight);
        console.log(this.flightGallery);
      },
    });
  }
}
