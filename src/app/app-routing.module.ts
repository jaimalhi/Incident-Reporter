import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { NewReportComponent } from './new-report/new-report.component';
import { ReportViewComponent } from './report-view/report-view.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'report/new', component: NewReportComponent },
  { path: 'report/:rKey', component: ReportViewComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
