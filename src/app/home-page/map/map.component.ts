import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { IncidentReport } from 'src/app/report-utils/incidentReport';
import { ReportsService } from 'src/app/reports.service';

interface locationInfo {
  lat: number;
  long: number;
  criminalName: string;
  status: string;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  private map!: L.Map;
  reportLocations: locationInfo[] = [];

  constructor(private rs: ReportsService) {}

  ngOnInit(): void {
    this.showMap();
    this.initLocationData();
  }

  showMap() {
    this.map = L.map('map').setView([49.21, -122.88], 11);

    const tiles = L.tileLayer(
      'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> ',
      }
    ).addTo(this.map);
  }

  initLocationData() {
    let reports: IncidentReport[] = this.rs.get();
    // get coords for each location
    reports.forEach((r) => {
      this.reportLocations.push({
        lat: r.location[0],
        long: r.location[1],
        criminalName: r.criminalName,
        status: r.status,
      });
    });
    // set markers for each location
    this.reportLocations.forEach((location) => {
      L.marker([location.lat, location.long])
        .addTo(this.map)
        .bindPopup(
          `<b>${
            location.criminalName
          }</b><br />Status: <i>${location.status.toUpperCase()}</i>`
        );
    });
  }
}
