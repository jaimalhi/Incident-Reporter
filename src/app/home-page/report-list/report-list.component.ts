import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmPasswordComponent } from 'src/app/confirm-password/confirm-password';
import { IncidentReport } from 'src/app/report-utils/incidentReport';
import { ReportsService } from 'src/app/reports.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css'],
})
export class ReportListComponent implements OnInit {
  @ViewChild(ConfirmPasswordComponent)
  confirmPasswordDialog!: ConfirmPasswordComponent;
  reports: IncidentReport[] = [];
  reportKey: number = -1;
  constructor(private rs: ReportsService) {}

  ngOnInit(): void {
    this.reports = this.rs.get();
  }

  onReportDelete(event: { rKey: number }) {
    this.reportKey = event.rKey;
    this.confirmPasswordDialog.openDialog(
      new IncidentReport(-999, new Date(), 'closed', '', [], '', '', '', 'FAKE')
    );
  }
}
