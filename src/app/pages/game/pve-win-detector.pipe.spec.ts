import { PveWinDetectorPipe } from './pve-win-detector.pipe';

xdescribe('PveWinDetectorPipe', () => {
   it('create an instance', () => {
      const pipe = new PveWinDetectorPipe();
      expect(pipe).toBeTruthy();
   });
});
