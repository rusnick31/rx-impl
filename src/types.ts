import Observable from "./Observable";
import Subscriber from "./Subscriber";

export interface SubscriptionLike {
  readonly closed: boolean;
  unsubscribe: () => void;
}

export interface Observer<T> {
  next(value?: T): void;
  error(): void;
  complete(): void;
}

export type OperatorFunction<T, R> = (
  observable: Observable<T>
) => Observable<R>;

export interface Operator<T, R> {
  call(subscriber: Subscriber<R>, source: Observable<T>): Subscriber<T>;
}

export type TearDownLogic = () => void;
