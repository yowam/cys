import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReportService } from '../shared/services/report.service';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    standalone: false
})
export class ContactComponent {
  loading = false;
  showThanks = false;
  message = '';
  @ViewChild('reportForm') reportForm: NgForm;

  constructor(
    private reportService: ReportService
  ) {}

  async sendReport(): Promise<void> {
    this.loading = true;

    const res = await this.reportService.report({
      message: this.reportForm.value.message,
      type: 'message'
    });

    if (res) {
      this.showThanks = true;
    }

    this.loading = false;
  }
}
