import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-report-view',
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.css'],
})
export class ReportViewComponent {
  rKey: number = this.activatedRoute.snapshot.params['rKey'];
  constructor(private activatedRoute: ActivatedRoute) {}

  //TODO: get report based on rKey via API
}
