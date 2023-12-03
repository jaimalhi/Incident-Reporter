import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportsService } from '../reports.service';
import { IncidentReport } from '../report-utils/incidentReport';
import { GeocodeService } from '../geocode.service';
import { ConfirmPasswordComponent } from '../confirm-password/confirm-password';

@Component({
  selector: 'app-report-view',
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.css'],
})
export class ReportViewComponent implements OnInit {
  @ViewChild(ConfirmPasswordComponent)
  confirmPasswordDialog!: ConfirmPasswordComponent;
  rKey: number = this.activatedRoute.snapshot.params['rKey'];
  report!: IncidentReport;
  imageIncluded: boolean;
  extraInfoIncluded: boolean;
  cityName: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private rs: ReportsService,
    private gs: GeocodeService
  ) {
    this.imageIncluded = false;
    this.extraInfoIncluded = false;
    this.cityName = 'N/A';
  }

  ngOnInit(): void {
    this.rs.getSingleReport(this.rKey).subscribe((resp) => {
      this.report = new IncidentReport(
        +resp.key,
        resp.data[0].time,
        resp.data[0].status,
        resp.data[0].picture,
        resp.data[0].location,
        resp.data[0].extraInfo,
        resp.data[0].reporterName,
        resp.data[0].reporterNum,
        resp.data[0].criminalInfo
      );
      this.formatExtraAttributes(this.report.picture, this.report.extraInfo);
      this.fetchMapLocation();
    });
  }

  fetchMapLocation(): void {
    // Assuming report.location is an array of [latitude, longitude]
    if (this.report.location && this.report.location.length === 2) {
      this.gs.getCity(this.report.location).subscribe((city) => {
        this.cityName = city;
      });
    }
  }

  formatExtraAttributes(pic: string, extra: string) {
    if (pic !== '') {
      this.imageIncluded = true;
    }
    if (extra !== '') {
      this.extraInfoIncluded = true;
    }
  }

  changeStatus() {
    this.confirmPasswordDialog.openDialog(this.report);
  }
}
