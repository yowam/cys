import { Component } from '@angular/core';
import { CommentService } from '../../shared/services/comment.service';
import { Comment } from '../../shared/model/comment';
@Component({
  selector: 'app-account-comments',
  templateUrl: './account-comments.component.html',
  styleUrls: ['./account-comments.component.scss']
})
export class AccountCommentsComponent {
  userComments: Comment[];
  endOfComments = false;
  isLoading = false;

  constructor(
    private commentService: CommentService
  ) {}

  async ngOnInit(): Promise<void> {
    this.userComments = await this.commentService.getUserComments();

    if (this.userComments.length < 5) {
      this.endOfComments = true;
    }
  }

  async loadMore() {
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;
    const nextComments = await this.commentService.getUserComments(
      this.userComments[this.userComments.length - 1].id
    )
    if (nextComments.length < 5) { // 5 is page size on BE
      this.endOfComments = true;
    }
    this.userComments = this.userComments.concat(nextComments);
    this.isLoading = false;
  }
}
