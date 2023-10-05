import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
   name: 'sentencecase',
   standalone: true
})
export class SentenceCasePipe implements PipeTransform {

   transform(word: string): string {
      return word[0].toUpperCase() + word.slice(1);
   }

}
