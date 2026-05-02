import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {
  transform(
    items: Array<any>,
    sortBy: string | any // Function, tslint didn't accept it
  ): Array<any> {
    if (typeof sortBy === 'function') {
      return items.sort(sortBy);
    } else {
      return items.sort((a, b) => {
        const textA = a[sortBy].toLowerCase();
        const textB = b[sortBy].toLowerCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
    }
  }
}
