import { Component } from '@angular/core';
import { env } from '../../../environments/environment';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css'],
})
export class ReportListComponent {
  private apiUrl = env.apiUrl;
}
