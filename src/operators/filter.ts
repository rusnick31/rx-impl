import { OperatorFunction, Operator } from "../types";
import Observable from "../Observable";
import Subscriber from "../Subscriber";

export function filter<T>(
  predicate: (value: T) => boolean
): OperatorFunction<T, T> {
  return source => source.lift(new FilterOperator(predicate));
}

class FilterOperator<T> implements Operator<T, T> {
  constructor(private predicate: (value: T) => boolean) {}

  call(subscriber: Subscriber<T>, source: Observable<T>) {
    return source.subscribe(new FilterSubscriber(subscriber, this.predicate));
  }
}

class FilterSubscriber<T> extends Subscriber<T> {
  constructor(
    subscriber: Subscriber<T>,
    private predicate: (value: T) => boolean
  ) {
    super(subscriber);
  }

  _next(value: T) {
    let result: boolean;
    try {
      result = this.predicate(value);
    } catch (error) {
      this.destination.error();
    }
    if (result) {
      this.destination.next(value);
    }
  }
}
