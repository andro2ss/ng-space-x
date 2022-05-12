import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpaceX } from '../models/spaceXList.model';
import { SpaceXLounchpad } from '../models/spaceXLaunchpad';

@Injectable({
  providedIn: 'root',
})
export class GetDetailDataLaunchPadService {
  constructor(private http: HttpClient) {}

  getDetailDataLaunchPad(id: string): Observable<SpaceXLounchpad> {
    // @ts-ignore
    return this.http.get(`https://api.spacexdata.com/v4/launchpads/${id}`);
  }
}
