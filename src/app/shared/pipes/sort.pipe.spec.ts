import { SortPipe } from './sort.pipe';

describe('SortPipe', () => {
   it('create an instance', () => {
      const pipe = new SortPipe();
      expect(pipe).toBeTruthy();
   });

   it('can sort strings by length', () => {
      const pipe = new SortPipe();
      expect(
         pipe.transform(["apple", "pear", "pineapple", "egg"], 'length')?.toString()
      ).toBe(
         ["egg", "pear", "apple", "pineapple"].toString()
      );
   });

   it('can handle null value', () => {
      const pipe = new SortPipe();
      expect(pipe.transform(null, 'some string')).toBeNull();
   });
});
