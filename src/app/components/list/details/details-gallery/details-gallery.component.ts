import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-gallery',
  templateUrl: './details-gallery.component.html',
  styleUrls: ['./details-gallery.component.scss'],
})
export class DetailsGalleryComponent implements OnInit {
  constructor() {}
  photoNum: number = 1;
  @Input() flightGallery?: string[];

  ngOnInit(): void {}

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
}
