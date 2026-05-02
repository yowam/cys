import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'commentDepth',
    standalone: false
})
export class CommentDepthPipe implements PipeTransform {
  transform(commentTreePath: string): string[] {
    return commentTreePath.split('/');
  }
}
