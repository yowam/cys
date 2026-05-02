import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commentDepth'
})
export class CommentDepthPipe implements PipeTransform {
  transform(commentTreePath: string): string[] {
    return commentTreePath.split('/');
  }
}
