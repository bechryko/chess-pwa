import { ReversePipe } from './reverse.pipe';

describe('ReversePipe', () => {
   it('create an instance', () => {
      const pipe = new ReversePipe();
      expect(pipe).toBeTruthy();
   });

   it('can reverse short array', () => {
      const pipe = new ReversePipe();
      expect(pipe.transform([1, 2, 3]).toString()).toBe([3, 2, 1].toString());
   });

   it('can reverse long array', () => {
      const pipe = new ReversePipe();
      const array = [];
      for(let i = 1; i <= 10_000; i++) {
         array.push(i);
      }
      const reversed = [...array].reverse()
      expect(pipe.transform(array).toString()).toBe(reversed.toString());
   });

   it('can reverse empty array', () => {
      const pipe = new ReversePipe();
      expect(pipe.transform([]).toString()).toBe([].toString());
   });
});
