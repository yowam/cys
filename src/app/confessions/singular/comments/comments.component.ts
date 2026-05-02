import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Comment, CommentWithTreeData } from '../../../shared/model/comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnInit, OnChanges {
  @Input() comments: Comment[];
  @Input() activeComment: string;
  @Input() confessionId: string;
  formattedComments: CommentWithTreeData[] = [];
  displayedComments: CommentWithTreeData[] = [];
  highlightedCommentPaths: boolean[][] = [];
  trackById = (index: number, comment: Comment) => comment.id;

  ngOnInit(): void {
    this.formattedComments = this.formatCommentTree(this.comments);
    this.displayedComments = [...this.formattedComments];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.comments) {
      this.formattedComments = this.formatCommentTree(changes.comments.currentValue);
      this.displayedComments = [...this.formattedComments];
    }
  }

  formatCommentTree(comments: Comment[]): CommentWithTreeData[] {
    const sortedComments = comments.sort((a: Comment, b: Comment) => {
      const partsA = a.commentTreePath.split('/').map(Number);
      const partsB = b.commentTreePath.split('/').map(Number);

      for (let i = 0; i < Math.max(partsA.length, partsB.length); i++) {
        const numA = partsA[i] !== undefined ? partsA[i] : -Infinity;
        const numB = partsB[i] !== undefined ? partsB[i] : -Infinity;

        if (numA !== numB) {
          return numA - numB;
        }
      }
      return 0;
    });

    // const sortedComments = comments.sort((a: Comment, b: Comment) => {
    //   return a.commentTreePath < b.commentTreePath ? -1 : a.commentTreePath > b.commentTreePath ? 1 : 0;
    // });

    const commentsWithTreeData = (sortedComments as any).map((comment: any) => {
      const commentPath = comment.commentTreePath.split('/');
      return Object.assign(comment, { treeData: Array(commentPath.length).fill(false) });
    })

    commentsWithTreeData.push({commentTreePath: '1000'}); // Hack way to not have to work out last group

    commentsWithTreeData.forEach((comment: CommentWithTreeData, index: number) => {
      const commentPath = comment.commentTreePath.split('/').map(path => + path);
      const lastPathItem = commentPath[commentPath.length - 1];
      let trimLength = 0;

      const groupLength = commentsWithTreeData
        .slice(index)
        .findIndex((_comment: CommentWithTreeData, _index: number) => {
          const _commentSplitPath = _comment.commentTreePath.split('/');
          if (commentPath.length > _commentSplitPath.length) {
            return true;
          }
          if (+(_commentSplitPath[commentPath.length - 1]) > lastPathItem) {
            return true;
          }
          return false;
        });

      const groupComments = commentsWithTreeData.slice(index, index + groupLength);
      const groupCommentsReversed = [...groupComments].reverse();

      if (groupComments.length) {
        trimLength = groupCommentsReversed.findIndex((_comment: CommentWithTreeData, _index: number) => {
          const firstInGroupCommentsPath = groupComments[0].commentTreePath.split('/');
          const _commentSplitPath = _comment.commentTreePath.split('/');
          if (_commentSplitPath.length - 1 === firstInGroupCommentsPath.length) {
            return true;
          }
          return false;
        });
      }

      for (let i = 0; i < (groupLength - 1 - (trimLength > 0 ? trimLength : 0)); i++) {
        commentsWithTreeData[index + i].treeData[commentPath.length - 1] = true;
      }
    });

    commentsWithTreeData.splice(-1); // remove hack

    this.highlightedCommentPaths = commentsWithTreeData
      .map((commentWithTreeData: CommentWithTreeData) => [...commentWithTreeData.treeData].fill(false));

    return commentsWithTreeData;
  }

  setHighlightedCommentPath(data: {comment: CommentWithTreeData, index: number}) {
    const pathToHighlight = data.comment.commentTreePath.split('/').slice(0, data.index + 1).join('/');

    this.highlightedCommentPaths = this.formattedComments
      .map((commentWithTreeData: CommentWithTreeData) => {
        if (commentWithTreeData.commentTreePath.startsWith(pathToHighlight)) {
          const newPath = [...commentWithTreeData.treeData].fill(false);
          newPath[data.index] = true;
          return newPath;
        }
        return [...commentWithTreeData.treeData].fill(false);
      });
  }

  resetHighlightedCommentPath() {
    this.highlightedCommentPaths = this.highlightedCommentPaths.map(path => path.fill(false));
  }

  collapseTree(data: {comment: CommentWithTreeData, index: number}) {
    const pathToHide = data.comment.commentTreePath.split('/').slice(0, data.index + 1).join('/');
    let countFiltered = data.comment.isCollapsed ? 0 : 1;

    this.displayedComments
      .forEach((commentWithTreeData: CommentWithTreeData) => {
        if (
          commentWithTreeData.commentTreePath.startsWith(pathToHide) &&
          data.comment.commentTreePath.split('/').length < commentWithTreeData.commentTreePath.split('/').length
        ) {
          if (data.comment.isCollapsed) {
            commentWithTreeData.isCollapsed = 0;
            commentWithTreeData.hide = false;
          } else {
            countFiltered++;
            commentWithTreeData.hide = true;
          }
        }
      });
    data.comment.isCollapsed = countFiltered;
    this.displayedComments = this.formatCommentTree(this.displayedComments);
  }

  addComment(comment: Comment) {
    this.comments.push(comment);
    this.formattedComments = this.formatCommentTree(this.comments);
    this.displayedComments = [...this.formattedComments];
    this.activeComment = comment.id;
  }
}
