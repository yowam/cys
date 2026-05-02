import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfessionsService } from './confessions.service';
import { CommentService } from './comment.service';
import { ReactionService } from './reaction.service';
import { NotificationService } from './notification.service';
import { ReportService } from './report.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    ConfessionsService,
    CommentService,
    ReactionService,
    NotificationService,
    ReportService
  ],
})
export class ServicesModule {}
