import { OperatorFunction, Operator } from "../types";
import Observable from "../Observable";
import Subscriber from "../Subscriber";

export function switchMap<T, V>(
  project: (value: T) => Observable<V | T>
): OperatorFunction<T, V | T> {
  return (source: Observable<T>) => source.lift(new SwitchMapOperator(project));
}

class SwitchMapOperator<T, V> implements Operator<T, V | T> {
  constructor(private project: (value: T) => Observable<V | T>) {}

  call(subscriber: Subscriber<V | T>, source: Observable<T>) {
    return source.subscribe(new SwitchMapSubscriber(subscriber, this.project));
  }
}

class SwitchMapSubscriber<T, V> extends Subscriber<T> {
  innerSubscriber: Subscriber<T | V>;

  constructor(
    subscriber: Subscriber<T | V>,
    private project: (value: T) => Observable<V | T>
  ) {
    super(subscriber);
    this.project = project;
  }

  _next(value: T) {
    if (this.innerSubscriber) {
      this.innerSubscriber.unsubscribe();
    }
    try {
      this.innerSubscriber = this.project(value).subscribe({
        next: value => this.destination.next(value),
        error: () => {},
        complete: () => {}
      });
    } catch (errors) {
      this.destination.error();
    }
  }
}
