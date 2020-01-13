import Observable from './Observable';
import { map, filter, scan, switchMap, multicast, refCount } from './operators';
import { interval, fromEvent } from './observables';
import { Subject } from './Subject';

window.subscription = interval(1000).subscribe({
  next: count => console.log(count),
});
