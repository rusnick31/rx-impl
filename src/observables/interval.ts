import Observable from '../Observable';
import { Scheduler } from '../schedulers/Scheduler';
import { Action } from '../schedulers/Action';
import Subscriber from '../Subscriber';

// export function interval(time: number): Observable<number> {
//   let count = 0;
//   return new Observable(subscriber => {
//     const id = setInterval(() => {
//       subscriber.next(count);
//       count += 1;
//     }, time);
//     return () => {
//       clearInterval(id);
//       console.log("unsubscribed from interval");
//     };
//   });
// }

const asyncScheduler = new Scheduler(Action);

export function interval(time: number): Observable<number> {
  return new Observable(subscriber => {
    const action = asyncScheduler.schedule(dispatch, time, {
      subscriber,
      count: 0,
      time,
    });
    subscriber.add(action);
    return subscriber;
  });
}

interface IntervalState {
  subscriber: Subscriber<number>;
  count: number;
  time: number;
}

function dispatch({ subscriber, count, time }: IntervalState) {
  subscriber.next(count);
  this.schedule(time, { subscriber, count: count + 1, time });
}
