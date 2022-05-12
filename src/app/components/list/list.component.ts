import { Component, OnInit } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { PrimeNGConfig } from 'primeng/api';
import { SpacexListService } from '../../services/spacex-list.service';
import { SpaceX } from '../../models/spaceXList.model';
import { saveConfig } from '../../helpers/saveConfigToSessionStorage';
import { showFlights } from '../../helpers/showFlightsList';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  spaceXList?: SpaceX[];
  flights?: SpaceX[];
  successFly: boolean = false;
  nameFly: string = '';
  dateFly?: Date[];
  minDate: Date;
  maxDate: Date;
  locale = 'pl';
  pageNum: number = 1;

  constructor(
    private localeService: BsLocaleService,
    private primengConfig: PrimeNGConfig,
    private spaceXListService: SpacexListService
  ) {
    this.minDate = new Date('2006-03-20T10:30:00+12:00');
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate());
  }

  ngOnInit(): void {
    this.getSpaceXList();
    this.localeService.use(this.locale);
    this.primengConfig.ripple = true;

    let tempData = window.sessionStorage.getItem('config');
    if (tempData) {
      let configData = JSON.parse(tempData);
      if (configData.dateFly) {
        this.dateFly = configData.dateFly;
      }
      if (configData.nameFly) {
        this.nameFly = configData.nameFly;
      }
      if (configData.successFly) {
        this.successFly = configData.successFly;
      }
      if (configData.pageNum) {
        this.pageNum = configData.pageNum;
      }
    }
  }

  paginationChange(direction: string) {
    if (direction === 'next') {
      this.pageNum += 1;
    } else {
      this.pageNum -= 1;
    }
    this.flights = showFlights(
      this.spaceXList,
      this.nameFly,
      this.successFly,
      this.dateFly,
      this.pageNum
    );
    saveConfig(this.successFly, this.nameFly, this.dateFly, this.pageNum);
    window.scroll(0, 0);
  }

  nextPageBtnControl() {
    let tempLength = 0;
    if (this.spaceXList) {
      tempLength = this.spaceXList.length;
    }
    return (
      Math.ceil(tempLength / 20) !== this.pageNum && this.flights?.length === 20
    );
  }

  backPageBtnControl() {
    return this.pageNum !== 1;
  }

  onSubmit() {
    this.flights = showFlights(
      this.spaceXList,
      this.nameFly,
      this.successFly,
      this.dateFly,
      this.pageNum
    );
    saveConfig(this.successFly, this.nameFly, this.dateFly, this.pageNum);
  }

  private getSpaceXList() {
    this.spaceXListService.getSpaceXList().subscribe({
      next: response => {
        this.spaceXList = response;
        this.flights = showFlights(
          this.spaceXList,
          this.nameFly,
          this.successFly,
          this.dateFly,
          this.pageNum
        );
      },
    });
  }
}
