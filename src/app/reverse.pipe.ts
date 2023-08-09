import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
   name: 'reverse'
})

export class ReversePipe implements PipeTransform {
   transform<T>(value: Array<T>): Array<T> {
      return value.slice().reverse();
   }
}
