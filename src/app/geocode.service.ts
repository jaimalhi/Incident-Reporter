import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GeocodeService {
  constructor(private http: HttpClient) {}

  getCity(latlon: number[]): Observable<string> {
    let [lat, long] = latlon;
    return this.http
      .get<any>(`https://geocode.maps.co/reverse?lat=${lat}&lon=${long}`)
      .pipe(
        map((data: any) =>
          data && data.address && data.address.city ? data.address.city : 'N/A'
        )
      );
  }
}
