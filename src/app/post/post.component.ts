import {
  Component,
  ViewChild,
  // OnInit,
  // OnDestroy
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfessionsService } from '../shared/services/confessions.service';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

// export const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
// export const urlPattern = /\b((https?:\/\/)?(www\.)?[\w-]+\.(com|org|net|gov|edu|co|io|info|biz|us|de|jp|uk|fr|ca|au|ru|it|in|br|mx|nl|se|ch|es|cc|asia|me|eu|cn|kr|pl|pt|cz|at|be|dk|fi|no|gr|nz|ie|se|hu|ro|sa|ph|cl|pe|ar|tr|co.uk|org.uk|com.au|edu.au|co.nz|org.nz|int|mil|aero|museum|cat|coop|jobs|tel|pro|name|mobi|asia|post|eu|co.jp|co.kr|xyz|tech|online|store|ai|app|club|design|tv|shop|music|fashion|health|photography|london|family|guru|space|studio|green|blog))(\S*)\b/gi
// export const phonePattern = /\b(?:\d[\s-_]*){6,}\b/g;
// export const numberPattern = /\d{5,}/g;

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss'],
    standalone: false
})
export class PostComponent {
  // implements OnInit, OnDestroy {
  post = '';
  preview = false;
  tags: string[] = [];
  tagInput = '';
  disableSubmit = false;
  isSending = false;
  // flagged = false;
  // modelChanged = new Subject<string>();
  // modelChangeSubscription: Subscription;
  @ViewChild('postForm') postForm: NgForm;

  constructor(
    private confessionsService: ConfessionsService,
    private router: Router
  ) {}

  // ngOnInit(): void {
  //   this.modelChangeSubscription = this.modelChanged
  //     .pipe(debounceTime(500))
  //     .subscribe(postText => {
  //       this.checkForFlags(postText);
  //     });
  // }

  // ngOnDestroy(): void {
  //   this.modelChangeSubscription.unsubscribe();
  // }

  async postConfession() {
    if (this.disableSubmit) {
      return;
    }

    if (! this.postForm.valid) {
      return;
    }

    this.isSending = true;
    const newConfession = await this.confessionsService.postConfession(this.postForm.value.post);
    this.isSending = false;
    this.postForm.reset();
    this.router.navigateByUrl('/confessions/' + newConfession.id + '/' + newConfession.slug);
  }

  confirmExit(): boolean {
    return confirm(`Are you sure you want to exit`);
  }

  // onPostChange(postText: string) {
  //   this.modelChanged.next(postText);
  // }

  // checkForFlags(postText: string): void {
  //   const flagged = [emailPattern, urlPattern, phonePattern, numberPattern].some(regex => regex.test(postText));
  //   thflagged
  // }

  // addTag(tag: string) {
  //   if (!tag) return;
  //   if (tag.length > 100) return;
  //   this.tagInput = '';
  //   this.tags.push(tag);
  // }

  // removeTag(tag: string) {
  //   this.tags = this.tags.filter(_tag => tag !== _tag);
  // }
}
