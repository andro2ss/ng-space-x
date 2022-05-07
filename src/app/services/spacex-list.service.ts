import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpaceX } from '../models/spaceXList.model';

@Injectable({
  providedIn: 'root',
})
export class SpacexListService {
  constructor(private http: HttpClient) {}

  getSpaceXList(): Observable<SpaceX[]> {
    // @ts-ignore
    return this.http.get('https://api.spacexdata.com/v4/launches/');
  }
}
