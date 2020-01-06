import { Subject } from '../Subject';
import { OperatorFunction } from '../types';
import Observable from '../Observable';
import { ConnectableObservable } from '../ConnectableObservable';

export function multicast<T>(
  subjectFactory: () => Subject<T>,
): OperatorFunction<T, T> {
  return (source: Observable<T>) => {
    return new ConnectableObservable<T>(source, subjectFactory);
  };
}
