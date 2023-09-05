import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
   name: 'sort',
   standalone: true
})
export class SortPipe implements PipeTransform {

   transform<T>(value: Array<T> | null, keyToCompare: keyof T): Array<T> | null {
      return value?.sort((a, b) => {
         if (a[keyToCompare] > b[keyToCompare]) {
            return 1;
         } else if (a[keyToCompare] < b[keyToCompare]) {
            return -1;
         } else {
            return 0;
         }
      }) ?? null;
   }

}
