import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordHashService } from '../password-hash.service';
import { ReportsService } from '../reports.service';
import { IncidentReport } from '../report-utils/incidentReport';

interface formInput {
  password: string;
}
@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.css'],
})
export class ConfirmPasswordComponent {
  @ViewChild('dialog') dialog!: ElementRef;
  @ViewChild('errorDialog') errorDialog!: ElementRef;
  @Input() rKey!: number;
  @Input() purpose!: string;
  expectedDigest = 'fcab0453879a2b2281bc5073e3f5fe54'; // BaggyJeans
  report!: IncidentReport;
  form: FormGroup;
  constructor(
    private hashService: PasswordHashService,
    private rs: ReportsService
  ) {
    let formControls = {
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
    };
    this.form = new FormGroup(formControls);
  }

  onConfirmPassword(input: formInput) {
    if (this.purpose === 'delete') {
      this.hashService.getMd5Digest(input.password).subscribe((response) => {
        this.validateDelete(response.Digest);
      });
    } else if (this.purpose === 'change') {
      this.hashService.getMd5Digest(input.password).subscribe((response) => {
        this.validateChange(response.Digest);
      });
    }
  }

  validateDelete(digest: string) {
    if (digest === this.expectedDigest) {
      this.rs.delete(this.rKey);
    } else {
      this.showErrorDialog();
    }
  }

  validateChange(digest: string) {
    if (digest === this.expectedDigest) {
      let currStatus =
        this.report.status.toLowerCase() === 'open' ? 'closed' : 'open';
      console.log(
        `Changing Status from ${this.report.status} to ${currStatus}`
      );
      this.rs.updateReportStatus(this.report).subscribe((resp) => {
        this.report.status = currStatus;
      });
    } else {
      this.showErrorDialog();
    }
  }

  openDialog(reportInfo: IncidentReport) {
    this.form.reset();
    this.dialog.nativeElement.showModal();
    this.report = reportInfo;
  }

  closeDialog() {
    this.dialog.nativeElement.close();
  }

  showErrorDialog() {
    this.errorDialog.nativeElement.showModal();
    setTimeout(() => {
      this.errorDialog.nativeElement.close();
    }, 2000);
  }
}
