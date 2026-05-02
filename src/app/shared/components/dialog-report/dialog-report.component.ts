import { Component, OnInit, Inject } from '@angular/core';
import { Confession } from '../../model/confession';
import { Comment } from '../../model/comment';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Router } from '@angular/router';
import { ReportService } from '../../services/report.service';

export interface DialogData {
  confession?: Confession;
  comment?: Comment;
}

@Component({
  selector: 'app-dialog-report',
  templateUrl: './dialog-report.component.html',
  styleUrls: ['./dialog-report.component.scss']
})
export class DialogReportComponent implements OnInit {
  public reportTypes = [
    { value: 'rule', label: 'Breaks the Content Policy' },
    { value: 'harassment', label: 'Harassment' },
    { value: 'violence', label: 'Threatening violence' },
    { value: 'spam', label: 'Spam' },
    { value: 'dox', label: 'Sharing personal information' },
    { value: 'impersonation', label: 'Impersonation' },
    { value: 'sales', label: 'Prohibited transaction' },
  ];
  loading = false;
  showThanks = false;

  constructor(
    public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public data: DialogData,
    private router: Router,
    private reportService: ReportService
  ) {}

  ngOnInit() {}

  async report(message: string) {
    this.loading = true;

    let reportedParams: any = {
      message
    };

    if (this.data.confession) {
      reportedParams.reportedId = this.data.confession.id,
      reportedParams.type = 'confession',
      reportedParams.content = this.data.confession.body
    }

    if (this.data.comment) {
      reportedParams.reportedId = this.data.comment.confessionId,
      reportedParams.type = 'comment',
      reportedParams.content = this.data.comment.body
    }
    const res = await this.reportService.report(reportedParams);

    if (res) {
      this.showThanks = true;
    }

    this.loading = false;
  }

  linkToContentPolicy(): void {
    const url = this.router.serializeUrl(this.router.createUrlTree(['/policies/content-policy']));
    window.open(url, '_blank');
  }
}
