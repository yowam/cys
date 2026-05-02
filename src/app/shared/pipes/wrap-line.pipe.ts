import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import DOMPurify from 'dompurify';

@Pipe({
  name: 'wrapLine'
})
export class WrapLinePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    if (!value) {
      return value;
    }

    // Split the input string by line breaks
    const lines = value.split('\n');

    // Process each line: if it starts with '>', wrap it in a <span> tag
    const wrappedLines = lines.map(line => {
      if (line.trim().startsWith('>')) {
        return `<span>${line}</span>`;
      }
      return line;
    });

     // Join the lines back into a single string
     const transformedString = wrappedLines.join('\n');

     const outputString = transformedString.replace(/\[removed\]|\[url censored\]|\[email censored\]|\[number censored\]/g, (match) => {
      return `<em>${match}</em>`;
    });

     // Sanitize the content using DOMPurify before trusting it
     const sanitizedContent = DOMPurify.sanitize(outputString, {
      ALLOWED_TAGS: ['span', 'em'],
      ALLOWED_ATTR: []
    });

     // Return the sanitized and trusted HTML
     return this.sanitizer.bypassSecurityTrustHtml(sanitizedContent);
  }

}
