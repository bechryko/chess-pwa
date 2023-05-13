import { Pipe, PipeTransform } from '@angular/core';
import { LeaderboardElement } from 'src/app/services/model';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: Array<LeaderboardElement> | null): Array<LeaderboardElement> | null {
    return value?.sort((a, b) => {
      if(a.score > b.score) {
        return -1;
      } else if(a.score < b.score) {
        return 1;
      } else {
        return 0;
      }
    }) ?? null;
  }

}
