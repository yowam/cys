import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthStore } from '../../services/auth.store';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
    standalone: false
})
export class DetailsComponent implements OnInit, OnDestroy {
  user: any;

  resetForm: UntypedFormGroup;
  deleteForm: UntypedFormGroup;
  loading = false;
  resetCompleted = false;
  resetFailed = false;
  deleteCompleted = false;
  deleteFailed = false;
  

  protected destroyed$: Subject<void> = new Subject<void>();

  constructor(
    private fb: UntypedFormBuilder,
    private auth: AuthStore,
  ) {
    this.resetForm = fb.group({
      password: [{ value: '', disabled: this.loading }, [Validators.required]],
    });
    this.deleteForm = this.fb.group({
      password: [{ value: '', disabled: this.loading }, [Validators.required]],
    });
  }

  ngOnInit() {
    this.auth.user$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((event: any) => {
        if (! event) return;
        this.user = event.user
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  resetPassword() {
    const val = this.resetForm.value;
    this.loading = true;

    this.auth.resetPassword(val.password).subscribe(
      () => {
        this.resetCompleted = true;
        this.loading = false;
      },
      err => {
        console.log('err: ', err);
        this.resetFailed = true;
        this.loading = false;
      }
    );
  }

  deleteAccount() {
    if (this.deleteForm.invalid) return;

    const val = this.deleteForm.value;

    this.loading = true;
    this.deleteCompleted = false;
    this.deleteFailed = false;

    this.auth.deleteAccount(val.password).subscribe(
      () => {
        this.deleteCompleted = true;
        this.loading = false;
      },
      err => {
        console.log('err: ', err);
        this.deleteFailed = true;
        this.loading = false;
      }
    );
  }
}
