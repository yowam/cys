import { Component, OnInit, Input, ViewChild } from '@angular/core';
// import { CdkMenuTrigger } from '@angular/cdk/menu';
import { Confession } from '../../model/confession';
import { Reaction } from '../../model/reaction';
import { Dialog } from '@angular/cdk/dialog';
import { DialogReportComponent } from '../dialog-report/dialog-report.component';
import { AuthStore } from '../../../services/auth.store';
import { scraperUser, testUser } from '../../constants/users';
import { ConfessionsService } from '../../services/confessions.service';
import { ReportService } from '../../services/report.service';

@Component({
    selector: 'app-preview',
    templateUrl: './preview.component.html',
    styleUrls: ['./preview.component.scss'],
    standalone: false
})
export class PreviewComponent implements OnInit {
  @Input() confession: Confession;
  @Input() isFeed = false;
  @Input() reaction?: Reaction;

  showReactPopout = false;
  countdownTimer: any;
  isReacting = false;
  isUserAdmin = false;
  scraperUser = scraperUser;
  testUser = testUser;

  // @ViewChild(CdkMenuTrigger) reactTrigger: CdkMenuTrigger;

  constructor(
    public dialog: Dialog,
    private auth: AuthStore,
    private confessionsService: ConfessionsService,
    private reportService: ReportService
  ) {}

  ngOnInit(): void {
    this.isUserAdmin = this.auth.isAdmin();
  }

  openReportDialog(): void {
    this.dialog.open<string>(DialogReportComponent, {
      data: {
        confession: this.confession
      }
    });
  }

  triggerReactMenu() {
    this.showReactPopout = true;

    if (this.countdownTimer) {
      clearTimeout(this.countdownTimer);
      this.countdownTimer = null;
    }
  }

  triggerReactMenuHideCounter() {
    if (this.isReacting) return;

    if (this.countdownTimer) {
      clearTimeout(this.countdownTimer);
    }

    this.countdownTimer = setTimeout(() => {
      this.performAction();
    }, 1000);
  }

  updateReaction(newReaction: Reaction) {
    const oldReaction = this.reaction ? Object.assign({}, this.reaction) : undefined;
    this.reaction = newReaction;

    if (!oldReaction && newReaction) {
      this.confession.likeCount = this.confession.likeCount + 1;
    }
    if (oldReaction && !newReaction) {
      this.confession.likeCount = this.confession.likeCount - 1;
    }

    this.showReactPopout = false;
  }

  private performAction() {
    this.showReactPopout = false;
  }

  rejectConfession(confessionId: string): void {
    this.confessionsService.updateConfessionStatus(confessionId, 'REJECTED');
  }

  banUser(confessionId: string): void {
    this.reportService.ban(confessionId);
  }
}
