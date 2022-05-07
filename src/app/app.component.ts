import { Component, OnInit } from '@angular/core';
import { SpacexListService } from './services/spacex-list.service';
import { SpaceX } from './models/spaceXList.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private spaceXListService: SpacexListService) {}
  spaceXList?: SpaceX[];

  ngOnInit(): void {
    this.getSpaceXList();
  }

  private getSpaceXList() {
    this.spaceXListService.getSpaceXList().subscribe({
      next: response => {
        this.spaceXList = response;
        console.log(response);
      },
    });
  }
}
