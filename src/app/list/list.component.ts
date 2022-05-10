import { Component, OnInit } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  successFly: boolean = false;
  nameFly: string = '';
  dateFly?: Date[];
  minDate: Date;
  maxDate: Date;
  locale = 'pl';

  constructor(
    private localeService: BsLocaleService,
    private primengConfig: PrimeNGConfig
  ) {
    this.minDate = new Date('2006-03-20T10:30:00+12:00');
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate());
  }

  ngOnInit(): void {
    this.localeService.use(this.locale);
    this.primengConfig.ripple = true;
  }
}
