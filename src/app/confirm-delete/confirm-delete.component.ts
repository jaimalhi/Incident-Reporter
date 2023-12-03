import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordHashService } from '../password-hash.service';
import { ReportsService } from '../reports.service';

interface formInput {
  password: string;
}
@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css'],
})
export class ConfirmDeleteComponent {
  @ViewChild('dialog') dialog!: ElementRef;
  @ViewChild('errorDialog') errorDialog!: ElementRef;
  @Input() rKey!: number;
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

  onConfirmDelete(input: formInput) {
    this.hashService.getMd5Digest(input.password).subscribe((response) => {
      this.validateDigest(response.Digest);
    });
  }

  validateDigest(digest: string) {
    const expectedDigest = 'fcab0453879a2b2281bc5073e3f5fe54'; // BaggyJeans
    if (digest === expectedDigest) {
      this.rs.delete(this.rKey);
    } else {
      this.showErrorDialog();
    }
  }

  openDialog() {
    this.form.reset();
    this.dialog.nativeElement.showModal();
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
