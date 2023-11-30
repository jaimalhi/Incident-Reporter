import { Component, OnInit } from '@angular/core';
import { IncidentReport } from 'src/app/report-utils/incidentReport';
import { ReportsService } from 'src/app/reports.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css'],
})
export class ReportListComponent implements OnInit {
  reports: IncidentReport[] = [];
  query: string = '';
  constructor(private rs: ReportsService) {}

  ngOnInit(): void {
    this.reports = this.rs.get();
  }

  onReportDelete(event: { rKey: number }) {
    //TODO: show modal asking for password
    let reportKey = event.rKey;
    this.reports = this.rs.delete(reportKey);
  }
}
