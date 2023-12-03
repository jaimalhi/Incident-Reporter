import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmDeleteComponent } from 'src/app/confirm-delete/confirm-delete.component';
import { IncidentReport } from 'src/app/report-utils/incidentReport';
import { ReportsService } from 'src/app/reports.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css'],
})
export class ReportListComponent implements OnInit {
  @ViewChild(ConfirmDeleteComponent)
  confirmDeleteDialog!: ConfirmDeleteComponent;
  reports: IncidentReport[] = [];
  reportKey: number = -1;
  constructor(private rs: ReportsService) {}

  ngOnInit(): void {
    this.reports = this.rs.get();
  }

  onReportDelete(event: { rKey: number }) {
    this.reportKey = event.rKey;
    this.confirmDeleteDialog.openDialog();
  }
}
