import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MapComponent } from './home-page/map/map.component';
import { ReportListComponent } from './home-page/report-list/report-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReportComponent } from './report-utils/report/report.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    MapComponent,
    ReportListComponent,
    NavbarComponent,
    ReportComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
