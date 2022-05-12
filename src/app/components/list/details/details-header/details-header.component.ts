import { Component, Input, OnInit } from '@angular/core';
import { SpaceX } from '../../../../models/spaceXList.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details-header',
  templateUrl: './details-header.component.html',
  styleUrls: ['./details-header.component.scss'],
})
export class DetailsHeaderComponent implements OnInit {
  @Input() flight?: SpaceX;
  constructor(private router: Router, private route: ActivatedRoute) {}

  handleBack() {
    this.router.navigate(['../'], {
      relativeTo: this.route,
    });
  }

  ngOnInit(): void {}
}
