import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'blockquote'
})
export class BlockquotePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;

    const lines = value.split('\n');
    const wrappedLines = lines.map(line => {
      if (line.trimStart().startsWith('>')) {
        return `<blockquote class="content-quote">${line}</blockquote>`;
      } else {
        return line;
      }
    });

    return wrappedLines.join('\n');
  }
}
