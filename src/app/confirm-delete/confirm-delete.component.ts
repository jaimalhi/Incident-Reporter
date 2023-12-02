import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { PasswordHashService } from '../password-hash.service';
import { ReportsService } from '../reports.service';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css'],
})
export class ConfirmDeleteComponent {
  @ViewChild('dialog') dialog!: ElementRef;
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

  onConfirmDelete(password: string) {
    console.log(password);
    // this.hashService.getMd5Digest(password).subscribe((response) => {
    //   this.validateDigest(response.Digest);
    // });
  }

  validateDigest(digest: string) {
    const expectedDigest = 'fcab0453879a2b2281bc5073e3f5fe54'; // BaggyJeans
    if (digest === expectedDigest) {
      console.log('Digest matches!');
      // Handle matching digest
    } else {
      console.log('Digest does not match.');
      // Handle non-matching digest
    }
  }

  openDialog() {
    this.dialog.nativeElement.showModal();
  }

  closeDialog() {
    this.dialog.nativeElement.close();
  }
}
