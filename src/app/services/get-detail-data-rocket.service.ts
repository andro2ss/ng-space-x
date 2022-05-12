import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpaceXRocket } from '../models/spaceXRocket.model';

@Injectable({
  providedIn: 'root',
})
export class GetDetailDataRocketService {
  constructor(private http: HttpClient) {}

  getDetailDataRocket(id: string): Observable<SpaceXRocket> {
    // @ts-ignore
    return this.http.get(`https://api.spacexdata.com/v4/rockets/${id}`);
  }
}
