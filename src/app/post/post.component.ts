import {
  Component,
  ViewChild,
  OnInit,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfessionsService } from '../shared/services/confessions.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss'],
    standalone: false
})
export class PostComponent implements OnInit {
  post = '';
  preview = false;
  tags: string[] = [];
  tagInput = '';
  isSending = false;
  showPrivacyRecommendation = true;
  @ViewChild('postForm') postForm: NgForm;

  constructor(
    private confessionsService: ConfessionsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const ua = navigator.userAgent;

    this.showPrivacyRecommendation =
      /Chrome|Chromium|Edg|OPR|Safari/.test(ua) &&
      !(navigator as any).brave;
  }

  async postConfession() {
    if (this.isSending) {
      return;
    }

    if (! this.postForm.valid) {
      return;
    }

    this.isSending = true;

    try {
      const newConfession = await this.confessionsService.postConfession(this.postForm.value.post);
      this.postForm.reset();
      await this.router.navigateByUrl(
        `/confessions/${newConfession.id}/${newConfession.slug}`
      );
    } catch (err) {
      console.error(err);
    } finally {
      this.isSending = false;
    }
  }

  confirmExit(): boolean {
    return confirm(`Are you sure you want to exit`);
  }
}
