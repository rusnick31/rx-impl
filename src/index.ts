import Observable from "./Observable";
import map from "./operators/map";

const obs = new Observable(observer => {
  let count = 0;
  const id = setInterval(() => observer.next(count++), 1000);
  return () => {
    console.log("clearing");
    clearInterval(id);
  };
})
  .pipe(map((val: number) => val + 100))
  .subscribe({
    next: (val: number) => console.log(val)
  });

window.subscriber = obs;
