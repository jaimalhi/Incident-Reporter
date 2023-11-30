import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ReportsService } from '../reports.service';
import { IncidentReport } from '../report-utils/incidentReport';

import * as L from 'leaflet';

interface PartialReport {
  picture: string;
  extraInfo: string;
  reporterName: string;
  reporterNum: string;
  criminalName: string;
}

@Component({
  selector: 'app-new-report',
  templateUrl: './new-report.component.html',
  styleUrls: ['./new-report.component.css'],
})
export class NewReportComponent implements OnInit {
  private map!: L.Map;
  private location: number[] = [49.276765, -122.917957];
  form: FormGroup;

  constructor(private rs: ReportsService) {
    const urlPattern =
      '^(http://www.|https://www.|http://|https://)?[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$';

    let formControls = {
      picture: new FormControl('', [Validators.pattern(urlPattern)]),
      extraInfo: new FormControl(''),
      reporterName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        this.inputValidator as ValidatorFn,
      ]),
      reporterNum: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(/^\d+$/), // numbers only
        this.inputValidator as ValidatorFn,
      ]),
      criminalName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        this.inputValidator as ValidatorFn,
      ]),
    };
    this.form = new FormGroup(formControls);
  }

  ngOnInit(): void {
    this.showMap();
    this.showClick();
  }

  onSubmit(rInfo: PartialReport) {
    let newReport = new IncidentReport(
      999,
      new Date(),
      'open',
      rInfo.picture,
      this.location,
      rInfo.extraInfo,
      rInfo.reporterName,
      rInfo.reporterNum,
      rInfo.criminalName
    );
    // console.log(newReport);
    this.rs.add(newReport);
  }

  inputValidator(control: FormControl) {
    let badWords = ['stupid', 'idiot', 'heck', 'dummy'];
    if (badWords.includes(control.value.trim())) {
      return { name_error: `Your value cannot be ${control.value.trim()}` };
    } else {
      return null;
    }
  }

  private showMap() {
    this.map = L.map('add-map').setView([49.21, -122.88], 11);

    const tiles = L.tileLayer(
      'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> ',
      }
    ).addTo(this.map);
  }

  showClick() {
    this.map.on('click', (e) => {
      L.popup()
        .setLatLng(e.latlng)
        .setContent(`Incident at ${e.latlng.toString()}`)
        .openOn(this.map);
      //set current location to clicked
      this.location = [];
      this.location.push(e.latlng.lat);
      this.location.push(e.latlng.lng);
    });
  }
}
