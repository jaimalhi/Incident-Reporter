import { Injectable } from '@angular/core';
import { IncidentReport } from './report-utils/incidentReport';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { env } from '../environments/environment';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  reports: IncidentReport[] = [];
  private keyList: number[] = [-1];
  private apiUrl = env.apiUrl;

  constructor(private http: HttpClient, private router: Router) {
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

  private handleError(error: HttpErrorResponse) {
    // Your error handling logic here
    console.error('An error occurred:', error);
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  private organizeData(response: any): IncidentReport[] {
    let newReports: IncidentReport[] = [];
    for (let i = 0; i < response.length; i++) {
      let newReport = new IncidentReport(
        +response[i].key,
        new Date(response[i].data[0].time),
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
    this.keyList = newReports.map((report) => report.key);
    return newReports;
  }

  private deleteReport(rKey: number): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/documents/${rKey}`)
      .pipe(catchError(this.handleError));
  }

  private addReport(newReportData: IncidentReport): Observable<IncidentReport> {
    // Use HttpHeaders to set Content-Type
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    // custom JSON format
    let jsonReport = {
      key: newReportData.key,
      data: [
        {
          reporterName: newReportData.reporterName,
          reporterNum: newReportData.reporterNum,
          criminalInfo: newReportData.criminalName,
          location: newReportData.location,
          picture: newReportData.picture,
          extraInfo: newReportData.extraInfo,
          time: newReportData.time.toJSON(),
          status: newReportData.status,
        },
      ],
    };
    let jsonBody = JSON.stringify(jsonReport);

    return this.http
      .post<any>(`${this.apiUrl}/documents/`, jsonBody, httpOptions)
      .pipe(catchError(this.handleError));
  }

  add(newReport: IncidentReport) {
    // get 1 past max num in keyList, set as new key
    this.keyList = this.reports.map((report) => report.key);
    let maxNumber = Math.max(...this.keyList);
    newReport.key = maxNumber + 1;
    newReport.time = new Date();
    newReport.status = 'open';

    this.addReport(newReport).subscribe({
      next: (response) => {
        console.log('Report added successfully', response);
        this.reports.push(newReport);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Error adding report:', error);
        //Handle error here (e.g., show error message)
      },
    });
  }

  getDataFromAPI(): Observable<IncidentReport[]> {
    return this.http.get<any>(`${this.apiUrl}/documents/`).pipe(
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

  delete(rKey: number) {
    this.deleteReport(rKey).subscribe({
      next: (response) => {
        console.log('Report deleted successfully');
        this.reports = this.reports.filter((r) => r.key !== rKey);
        window.location.reload();
        // Handle successful deletion here (e.g., update the UI)
      },
      error: (error) => {
        console.error('Error deleting report:', error);
        // Handle error here (e.g., show error message)
      },
    });
  }

  getSingleReport(rKey: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/documents/${rKey}`);
  }

  updateReportStatus(report: IncidentReport): Observable<any> {
    // Use HttpHeaders to set Content-Type
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    report.status = report.status.toLowerCase() === 'open' ? 'closed' : 'open';
    // custom JSON format
    let jsonReport = {
      key: report.key,
      data: [
        {
          reporterName: report.reporterName,
          reporterNum: report.reporterNum,
          criminalInfo: report.criminalName,
          location: report.location,
          picture: report.picture,
          extraInfo: report.extraInfo,
          time: report.time,
          status: report.status,
        },
      ],
    };
    let jsonBody = JSON.stringify(jsonReport);

    return this.http
      .put<any>(`${this.apiUrl}/documents/${report.key}`, jsonBody, httpOptions)
      .pipe(catchError(this.handleError));
  }

  get() {
    return this.reports;
  }
}
