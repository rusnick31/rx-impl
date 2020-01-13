import { timer } from 'rxjs';
import {
  switchMap,
  multicast,
  map,
  repeatWhen,
  delay,
  take,
} from 'rxjs/operators';

timer(1000)
  .pipe(repeatWhen(subject => subject.pipe(delay(2000), take(2))))
  .subscribe({
    next: () => console.log('timedout'),
  });
