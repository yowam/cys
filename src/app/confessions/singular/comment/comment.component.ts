import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  OnDestroy,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Comment, CommentWithTreeData } from '../../../shared/model/comment';
import { CommentService } from '../../../shared/services/comment.service';
import { AuthStore } from '../../../services/auth.store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Dialog } from '@angular/cdk/dialog';
import { DialogReportComponent } from '../../../shared/components/dialog-report/dialog-report.component';
import { DialogLoginComponent } from '../../../dialog-login/dialog-login.component';
import { testUser, scraperUser } from '../../../shared/constants/users';

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrl: './comment.component.scss',
    standalone: false
})
export class CommentComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() comment: CommentWithTreeData;
  @Input() highlightedCommentPath: boolean[] = [];
  @Input() isCollapsed: number;
  @Input() isActive: boolean;
  @Input() confessionId: string;
  @Output() onPathHover = new EventEmitter<{comment: CommentWithTreeData, index: number}>();
  @Output() onPathLeave = new EventEmitter();
  @Output() onCollapseClick = new EventEmitter<{comment: CommentWithTreeData, index: number}>();
  @Output() onCommentAdded = new EventEmitter<Comment>();
  @ViewChild('replyTextArea') public replyTextArea: ElementRef;
  @ViewChild('replyForm') replyForm: NgForm;

  reply = '';
  showReplyForm = false;
  replyFormFocused = false;
  isSending = false;
  testUser = testUser;
  scraperUser = scraperUser;

  user: any;
  protected destroyed$: Subject<void> = new Subject<void>();

  constructor(
    private commentService: CommentService,
    private auth: AuthStore,
    protected cdr: ChangeDetectorRef,
    public dialog: Dialog,
  ) {}

  ngOnInit() {
    this.auth.user$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((event: any) => {
        if (! event) return;
        this.user = event.user
      });
  }

  ngAfterViewInit() {
    if (this.comment.contentStatus !== "ACTIVE") {
      // setTimeout(() => { // hack to run after the Angular render code (error: NG0100)
        this.onCollapseClick.emit({
          comment: this.comment,
          index: this.comment.commentTreePath.split('/').length - 1
        });
      // }, 0);
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  openReportDialog(): void {
    this.dialog.open<string>(DialogReportComponent, {
      data: {
        comment: this.comment
      }
    });
  }

  openReplyForm() {
    this.showReplyForm = true;
    this.cdr.detectChanges();
    this.replyTextArea.nativeElement.focus();
  }

  async postReply() {
    if (! this.replyForm.valid) {
      return;
    }

    if (this.user) {
      this.isSending = true;
      const comment = await this.commentService.postComment(this.replyForm.value.reply, this.confessionId, this.comment.commentTreePath);
      if (comment) {
        this.onCommentAdded.emit(comment);
      }

      this.replyForm.reset();
      this.showReplyForm = false;
      this.isSending = false;
    } else {
      this.dialog.open<string>(DialogLoginComponent, {});
    }
  }

  rejectComment() {
    this.commentService.updateCommentStatus(this.comment.id, 'REJECTED');
  }
}
