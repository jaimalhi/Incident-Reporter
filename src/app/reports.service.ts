import { Injectable } from '@angular/core';
import { IncidentReport } from './report-utils/incidentReport';
import { HttpClient } from '@angular/common/http';
import { env } from '../environments/environment';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  reports: IncidentReport[] = [];
  private keyList: number[] = [];
  private apiUrl = env.apiUrl;
  constructor(private http: HttpClient) {
    // this.reports = [
    //   new IncidentReport(
    //     0,
    //     new Date(),
    //     'OPEN',
    //     'image.jpg',
    //     [49.280061, -122.792304],
    //     'popping car tires',
    //     'Javi',
    //     '123-456-7890',
    //     'Pig Lord'
    //   ),
    //   new IncidentReport(
    //     1,
    //     new Date(),
    //     'CLOSED',
    //     'image.jpg',
    //     [49.205336, -122.78974],
    //     'spraying mace',
    //     'Javi',
    //     '123-456-7890',
    //     'Surrey Jack'
    //   ),
    // ];
  }

  initData(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getDataFromAPI().subscribe({
        next: (data) => {
          this.reports = data;
          resolve(true);
        },
        error: (error) => {
          console.error('Error fetching reports:', error);
          reject(error);
        },
      });
    });
  }

  private organizeData(response: any): IncidentReport[] {
    let newReports: IncidentReport[] = [];
    for (let i = 0; i < response.length; i++) {
      let newReport = new IncidentReport(
        +response[i].key,
        new Date(response[i].data.time),
        response[i].data[0].status,
        response[i].data[0].picture,
        response[i].data[0].location,
        response[i].data[0].extraInfo,
        response[i].data[0].reporterName,
        response[i].data[0].reporterNum,
        response[i].data[0].criminalInfo
      );
      newReports.push(newReport);
    }
    return newReports;
  }

  getDataFromAPI(): Observable<IncidentReport[]> {
    return this.http.get<any>(`${this.apiUrl}/documents`).pipe(
      map((response) => {
        if (response && response.length > 0) {
          return this.organizeData(response);
        } else {
          console.error('Valid attributes not found');
          return [];
        }
      }),
      catchError((error) => {
        console.error(error);
        return of([]); // Return an empty array in case of error
      })
    );
  }

  get() {
    return this.reports;
  }

  add(newReport: IncidentReport) {
    // get 1 past max num in keyList, set as new key
    let maxNumber = Math.max(...this.keyList);
    newReport.key = maxNumber + 1;
    newReport.time = new Date();
    newReport.status = 'open';
    // add to report list
    this.reports.push(newReport);
  }

  delete(rKey: number) {
    // remove report from list
    this.reports = this.reports.filter((r: { key: number }) => r.key !== rKey);
    return this.reports;
  }
}
