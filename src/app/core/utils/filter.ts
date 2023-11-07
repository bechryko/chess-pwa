export function filter<T>(arr: Readonly<Array<T>>, func: Function): Array<T> {
   const ret: Array<T> = [];
   for (let i = 0; i < arr.length; i++) {
      if (func(arr[i])) {
         ret.push(arr[i]);
      }
   }
   return ret;
}
