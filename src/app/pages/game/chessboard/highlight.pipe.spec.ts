import { HighlightPipe } from "./highlight.pipe";

xdescribe('HighlightPipe', () => {
   it('create an instance', () => {
      const pipe = new HighlightPipe();
      expect(pipe).toBeTruthy();
   });
});
