import Observable from './Observable';
import { map, filter, scan, switchMap, multicast, refCount } from './operators';
import { interval, fromEvent } from './observables';
import { Subject } from './Subject';

const observable = interval(1000).pipe(
  map(count => `It's ${count}`),
  multicast(() => new Subject()),
  refCount(),
);

window.sub1 = observable.subscribe({
  next: (value: string) => console.log(`1: ${value}`),
});

window.sub2 = observable.subscribe({
  next: (value: string) => console.log(`2: ${value}`),
});
