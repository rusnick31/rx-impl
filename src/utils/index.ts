import { Observer } from "../types";
import Subscriber from "../Subscriber";

export function pipe<T>(fns: Function[]) {
  return (x: T) => fns.reduce((acc, f) => f(acc), x);
}

export function toSubscriber<T>(observer: Observer<T>): Subscriber<T> {
  if (observer instanceof Subscriber) {
    return observer;
  }

  return new Subscriber(observer);
}
