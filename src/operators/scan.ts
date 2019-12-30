import { OperatorFunction, Operator } from "../types";
import Subscriber from "../Subscriber";
import Observable from "../Observable";

export function scan<A, V>(
  accumulator: (acc: A, value: V) => A,
  seed?: A
): OperatorFunction<V, A> {
  return source => source.lift(new ScanOperator(accumulator, seed));
}

class ScanOperator<T, V> implements Operator<T, V> {
  constructor(
    private accumulator: (acc: V | T, value: T) => V,
    private seed?: V
  ) {}

  call(subscriber: Subscriber<V>, source: Observable<T>) {
    return source.subscribe(
      new ScanSubscriber<T, V>(subscriber, this.accumulator, this.seed)
    );
  }
}

class ScanSubscriber<V, A> extends Subscriber<V> {
  accumValue: A | V;
  hasAccumValue: boolean;

  constructor(
    subscriber: Subscriber<A>,
    private accumulator: (acc: A | V, value: V) => A,
    seed?: A
  ) {
    super(subscriber);
    this.accumValue = seed;
    this.hasAccumValue = seed !== undefined;
  }

  _next(value: V) {
    if (!this.hasAccumValue) {
      this.hasAccumValue = true;
      this.accumValue = value;
      this.destination.next(this.accumValue);
      return;
    }
    try {
      this.accumValue = this.accumulator(this.accumValue, value);
      this.destination.next(this.accumValue);
    } catch (error) {
      this.destination.error();
    }
  }
}
