import {
  fromEvent,
  interval,
  Observable,
  of,
  defer,
  Subject,
  ConnectableObservable,
} from 'rxjs';
import { switchMap, multicast, map } from 'rxjs/operators';

// fromEvent(document.getElementById("test-button"), "click")
//   .pipe(switchMap(() => interval(1000)))
//   .subscribe({
//     next: value => console.log(value)
//   });

const connectable = interval(1000).pipe(
  map(() => Math.round(Math.random() * 10)),
  multicast(new Subject()),
);

window.connectable = connectable;
(connectable as ConnectableObservable<number>).connect();

window.con1 = connectable.subscribe({
  next: value => console.log(`1st: ${value}`),
});

window.con2 = connectable.subscribe({
  next: value => console.log(`2nd: ${value}`),
});
