import Observable from "./Observable";
import { map, filter } from "./operators";

const subscription = new Observable(observer => {
  let count = 0;
  const id = setInterval(() => observer.next(count++), 1000);
  return () => {
    console.log("clearing");
    clearInterval(id);
  };
})
  .pipe(
    map((val: number) => val + 100),
    filter(val => val < 105)
  )
  .subscribe({
    next: (val: number) => console.log(val)
  });

setTimeout(() => subscription.unsubscribe(), 10000);
