import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  Input,
  Inject,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  DOCUMENT
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CdkMenuTrigger } from '@angular/cdk/menu';
import { Confession } from '../../../shared/model/confession';
import { CommentService } from '../../../shared/services/comment.service';
import { CommentsComponent } from '../comments/comments.component';
// import { Subject } from 'rxjs';
import { first, take, tap } from 'rxjs/operators';
import { Reaction, ReactionType } from '../../../shared/model/reaction';
// import { mock } from '../comment/comment-mock';
import { Dialog } from '@angular/cdk/dialog';
import { DialogReportComponent } from '../../../shared/components/dialog-report/dialog-report.component';
import { Title, Meta } from '@angular/platform-browser';
import { AuthStore } from '../../../services/auth.store';
import { DialogLoginComponent } from '../../../dialog-login/dialog-login.component';
import { DialogShareComponent } from '../../../shared/components/dialog-share/dialog-share.component';

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss'],
    standalone: false
})
export class ItemComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() confession: Confession;

  comment = '';
  activeComment = '';
  focusComment = false;

  showReactPopout = false;
  countdownTimer: any;
  reaction: Reaction;
  isSending = false;
  isReacting = false;

  oldTitle: string;

  // comments: Comment[] = mock;
  // protected destroyed$: Subject<void> = new Subject<void>();

  @ViewChild('card') card: ElementRef;
  @ViewChild('comments') comments: CommentsComponent;
  @ViewChild('commentForm') commentForm: NgForm;
  @ViewChild('commentInput') commentInput: ElementRef;
  @ViewChild(CdkMenuTrigger) reactTrigger: CdkMenuTrigger;

  constructor(
    private commentService: CommentService,
    private route: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta,
    public dialog: Dialog,
    private auth: AuthStore,
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.oldTitle = this.titleService.getTitle();
  }

  ngOnInit() {
    this.titleService.setTitle('Confession: ' + this.confession.body.slice(0, 60));
    this.metaService.updateTag({name: 'description', content: this.confession.body.slice(0, 300)});

    this.metaService.addTag({name: 'twitter:card', content: 'summary'});
    this.metaService.addTag({name: 'og:url', content: `https://www.confessyoursins.online/confessions/${this.confession.id}/${this.confession.slug}`});
    this.metaService.addTag({name: 'og:title', content: 'An anonymous confession'});
    this.metaService.addTag({name: 'og:description', content: this.confession.body.slice(0, 300)});

    this.reaction = this.confession.reactions && this.confession.reactions[0];
  }

  ngAfterViewInit() {
    if (this.focusComment = this.route.snapshot.queryParams['comment']) {
      this.commentInput.nativeElement.focus();
    }

    this.route.fragment
      .pipe(first())
      .subscribe(fragment => {
        if (fragment) {
          this.activeComment = fragment;
          const el = this.document.getElementById(fragment);
          if (el) {
            setTimeout(() => {
              el.scrollIntoView({
                behavior: "smooth",
                block: "end",
              });
            }, 100);
          }
        }
      })
  }

  ngOnDestroy(): void {
    this.titleService.setTitle(this.oldTitle);
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

  private performAction() {
    this.showReactPopout = false;
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

  async postComment() {
    if (! this.commentForm.valid) {
      return;
    }


    this.auth.isLoggedIn$.pipe(take(1)).subscribe(async loggedIn => {
      if (loggedIn) {
        this.isSending = true;
        const comment = await this.commentService.postComment(this.commentForm.value.comment, this.confession.id);
        this.comments.addComment(comment);
        this.commentForm.reset();
        this.isSending = false;

        this.cdr.detectChanges();

        const divBottom = this.card.nativeElement.offsetTop + this.card.nativeElement.offsetHeight;
        const scrollPosition = divBottom - window.innerHeight;
        setTimeout(() => {
          window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
          });
        }, 100);
      } else {
        this.dialog.open<string>(DialogLoginComponent, {});
      }
    });
  }

  openReportDialog(): void {
    this.dialog.open<string>(DialogReportComponent, {
      data: {
        confession: this.confession
      }
    });
  }

  openShareDialog(): void {
    this.dialog.open<string>(DialogShareComponent, {
      data: {
        confession: this.confession
      }
    });
  }
}
