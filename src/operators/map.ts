import Subscriber from "../Subscriber";
import { OperatorFunction, Operator } from "../types";
import Observable from "../Observable";

export default function map<T, R>(
  project: (value: T) => R
): OperatorFunction<T, R> {
  return source => source.lift(new MapOperator(project));
}

class MapOperator<T, R> implements Operator<T, R> {
  constructor(private project: (value: T) => R) {}

  call(subscriber: Subscriber<R>, source: Observable<T>) {
    return source.subscribe(new MapSubscriber(subscriber, this.project));
  }
}

class MapSubscriber<T, R> extends Subscriber<T> {
  constructor(subscriber: Subscriber<R>, private project: (value: T) => R) {
    super(subscriber);
  }

  _next(value: T) {
    let nextValue: R;
    try {
      nextValue = this.project(value);
    } catch (error) {
      this.destination.error();
      return;
    }
    this.destination.next(nextValue);
  }
}
