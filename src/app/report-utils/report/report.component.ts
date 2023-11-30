import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IncidentReport } from '../incidentReport';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  @Input() report!: IncidentReport;
  @Output() delete = new EventEmitter();

  reportLocation: string = 'N/A';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // this.fetchMapLocation();
  }

  fetchMapLocation(): void {
    let lat = this.report.location[0];
    let long = this.report.location[1];
    this.http
      .get<any>(`https://geocode.maps.co/reverse?lat=${lat}&lon=${long}`)
      .subscribe((data: any) => {
        if (data && data.address && data.address.city) {
          this.reportLocation = data.address.city;
        } else {
          console.error('City not found in response');
        }
      });
  }

  onDelete(event: any, rKey: number) {
    event['rKey'] = rKey;
    // console.log(event);
    this.delete.emit(event);
  }
}
