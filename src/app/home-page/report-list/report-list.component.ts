import { Component } from '@angular/core';
import { env } from '../../../environments/environment';
import { IncidentReport } from 'src/app/report-utils/incidentReport';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css'],
})
export class ReportListComponent {
  private apiUrl = env.apiUrl;

  reports: IncidentReport[];
  query: string = '';
  constructor() {
    this.reports = [
      new IncidentReport(
        0,
        new Date(),
        'OPEN',
        'image.jpg',
        [49.280061, -122.792304],
        'popping car tires',
        'Javi',
        '123-456-7890',
        'Pig Lord'
      ),
      new IncidentReport(
        1,
        new Date(),
        'CLOSED',
        'image.jpg',
        [49.205336, -122.78974],
        'spraying mace',
        'Javi',
        '123-456-7890',
        'Surrey Jack'
      ),
    ];
  }

  onReportDelete(event: { rKey: number }) {
    //TODO: show modal asking for password

    let reportKey = event.rKey;
    // remove report from list
    this.reports = this.reports.filter(
      (r: { key: number }) => r.key != reportKey
    );
  }
}
