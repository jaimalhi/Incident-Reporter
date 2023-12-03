import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IncidentReport } from '../incidentReport';
import { GeocodeService } from 'src/app/geocode.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  @Input() report!: IncidentReport;
  @Output() delete = new EventEmitter();

  cityName: string = 'N/A';

  constructor(private http: HttpClient, private gs: GeocodeService) {}

  ngOnInit() {
    this.fetchMapLocation();
  }

  fetchMapLocation(): void {
    // Assuming report.location is an array of [latitude, longitude]
    if (this.report.location && this.report.location.length === 2) {
      this.gs.getCity(this.report.location).subscribe((city) => {
        this.cityName = city;
      });
    }
  }

  onDelete(event: any, rKey: number) {
    event['rKey'] = rKey;
    // console.log(event);
    this.delete.emit(event);
  }
}
