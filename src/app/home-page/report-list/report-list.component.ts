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
  selectedSort = 'time'; // default sorting option
  constructor(private rs: ReportsService) {}

  ngOnInit(): void {
    this.reports = this.rs.get();
    this.sortReports(this.selectedSort); // default sorting
  }

  onReportDelete(event: { rKey: number }) {
    this.reportKey = event.rKey;
    this.confirmPasswordDialog.openDialog(
      new IncidentReport(-999, new Date(), 'closed', '', [], '', '', '', 'FAKE')
    );
  }

  sortReports(field: string): void {
    this.reports.sort((a, b) => {
      if (field === 'time') {
        return new Date(a.time).getTime() - new Date(b.time).getTime();
      } else if (field === 'name') {
        return a.criminalName.localeCompare(b.criminalName);
      } else if (field === 'status') {
        return a.status.localeCompare(b.status);
      }
      return 0; // default return
    });
  }
}
