import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ago'
})
export class AgoPipe implements PipeTransform {
  transform(date: Date | string): string {
    if (typeof date === 'string') {
      date = new Date(date);
    }

    const now = new Date();
    const diffInSeconds = Math.floor((now.valueOf() - date.valueOf()) / 1000);

    const timeUnits = [
      { unit: "year", seconds: 31536000 },
      { unit: "month", seconds: 2592000 },
      { unit: "week", seconds: 604800 },
      { unit: "day", seconds: 86400 },
      { unit: "hour", seconds: 3600 },
      { unit: "minute", seconds: 60 },
      { unit: "second", seconds: 1 }
  ];

  for (const timeUnit of timeUnits) {
    const interval = Math.floor(diffInSeconds / timeUnit.seconds);
    if (interval >= 1) {
      return interval === 1
        ? `1 ${timeUnit.unit} ago`
        : `${interval} ${timeUnit.unit}s ago`;
    }
  }

    return "just now"; // In case the date is in the future or now
  }
}
