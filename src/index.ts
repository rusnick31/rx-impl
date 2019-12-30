import Observable from "./Observable";
import { map, filter, scan } from "./operators";
import { interval } from "./observables";
import "./reference";

// const subscription = new Observable(observer => {
//   let count = 0;
//   const id = setInterval(() => observer.next(count++), 1000);
//   return () => {
//     console.log("clearing");
//     clearInterval(id);
//   };
// }).pipe(
//   map((val: number) => val + 100),
//   filter(val => val < 105),
//   scan((acc: string | number, value: number) => `${acc} ${value}`)
// );
// .subscribe({
//   next: (val: number) => console.log(val)
// });

// setTimeout(() => subscription.unsubscribe(), 10000);

interval(1000)
  .pipe(map(count => `It's ${count}`))
  .subscribe({
    next: (value: string) => console.log(value)
  });
