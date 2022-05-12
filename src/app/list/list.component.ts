import { Component, OnInit } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { PrimeNGConfig } from 'primeng/api';
import { SpacexListService } from '../services/spacex-list.service';
import { SpaceX } from '../models/spaceXList.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

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
    private spaceXListService: SpacexListService,
    private router: Router,
    private route: ActivatedRoute
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

  showFlights() {
    const tempDate = new Date();
    this.flights = this.spaceXList
      ?.sort((a, b) => {
        return +new Date(b.date_utc) - +new Date(a.date_utc);
      })
      .filter(flight => {
        const compareDate = new Date(flight.date_utc);
        return compareDate <= tempDate;
      })
      .filter(flight => {
        if (this.nameFly.length > 1) {
          return flight.name === this.nameFly;
        } else {
          return flight;
        }
      })
      .filter(flight => {
        if (this.successFly) {
          return flight.success;
        } else {
          return flight;
        }
      })
      .filter(flight => {
        if (this.dateFly) {
          const dateFilterMin = new Date(this.dateFly[0]);
          const dateFilterMax = new Date(this.dateFly[1]);
          const tempDate = new Date(flight.date_utc);
          return tempDate >= dateFilterMin && tempDate <= dateFilterMax;
        } else {
          return flight;
        }
      })
      .filter((flight, index) => {
        const fromIndex = (this.pageNum - 1) * 20;
        const toIndex = this.pageNum * 20;
        return index >= fromIndex && index < toIndex;
      });
  }

  paginationChange(direction: string) {
    if (direction === 'next') {
      this.pageNum += 1;
    } else {
      this.pageNum -= 1;
    }
    this.showFlights();
    this.saveConfig();
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

  saveConfig() {
    let tempData = {
      successFly: this.successFly,
      nameFly: this.nameFly,
      dateFly: this.dateFly,
      pageNum: this.pageNum,
    };
    window.sessionStorage.setItem('config', JSON.stringify(tempData));
  }

  onSubmit() {
    this.showFlights();
    this.saveConfig();
  }

  handleDetails(flight: SpaceX) {
    this.router.navigate([flight.id], {
      relativeTo: this.route,
    });
  }

  private getSpaceXList() {
    this.spaceXListService.getSpaceXList().subscribe({
      next: response => {
        this.spaceXList = response;
        this.showFlights();
      },
    });
  }
}
