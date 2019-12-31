import Observable from "../Observable";

export function interval(time: number): Observable<number> {
  let count = 0;
  return new Observable(subscriber => {
    const id = setInterval(() => {
      subscriber.next(count);
      count += 1;
    }, time);
    return () => {
      clearInterval(id);
      console.log("unsubscribed from interval");
    };
  });
}
