import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MapComponent } from './home-page/map/map.component';
import { ReportListComponent } from './home-page/report-list/report-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReportComponent } from './report-utils/report/report.component';
import { NewReportComponent } from './new-report/new-report.component';
import { ReportsService } from './reports.service';

// wait for this Promise to resolve before continuing
export function initializeApp(rs: ReportsService) {
  return (): Promise<any> => {
    return rs.initData();
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    MapComponent,
    ReportListComponent,
    NavbarComponent,
    ReportComponent,
    NewReportComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ReportsService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
