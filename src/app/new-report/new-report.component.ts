import { Component } from '@angular/core';
import { ReportsService } from '../reports.service';

@Component({
  selector: 'app-new-report',
  templateUrl: './new-report.component.html',
  styleUrls: ['./new-report.component.css'],
})
export class NewReportComponent {
  constructor(private rs: ReportsService) {}
}
