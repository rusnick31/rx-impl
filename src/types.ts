import Observable from './Observable';
import Subscriber from './Subscriber';
import Subscription from './Subscription';

export interface SubscriptionLike {
  readonly closed: boolean;
  unsubscribe: () => void;
}

export interface Observer<T> {
  next(value?: T): void;
  error?(): void;
  complete?(): void;
}

export type OperatorFunction<T, V> = (
  observable: Observable<T>,
) => Observable<V>;

export interface Operator<T, V> {
  call(subscriber: Subscriber<V>, source: Observable<T>): Subscriber<T>;
}

export type TearDownLogic = (() => void) | { unsubscribe(): void };

export interface SchedulerLike {
  schedule(work: Function, delay: number, state: any): Subscription;
}
