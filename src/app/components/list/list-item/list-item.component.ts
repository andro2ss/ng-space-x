import { Component, Input, OnInit } from '@angular/core';
import { SpaceX } from '../../../models/spaceXList.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  @Input() flights?: SpaceX[];

  ngOnInit(): void {}

  handleDetails(flight: SpaceX) {
    this.router.navigate([flight.id], {
      relativeTo: this.route,
    });
  }
}
