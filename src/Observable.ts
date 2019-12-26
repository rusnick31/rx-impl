import { Observer, TearDownLogic, Operator } from "./types";
import Subscriber from "./Subscriber";
import { pipe } from "./utils/";

class Observable<T> {
  private source: Observable<T> = null;
  private operator: any = null;

  constructor(private producer?: (observer: Observer<T>) => TearDownLogic) {}

  subscribe(observer: Observer<T>) {
    const sink =
      observer instanceof Subscriber ? observer : new Subscriber(observer);

    if (this.operator) {
      sink.add(this.operator.call(sink, this.source));
    } else {
      sink.add(this.producer(sink));
    }

    return sink;
  }

  lift<R>(operator: Operator<T, R>): Observable<R> {
    const observable = new Observable();
    observable.source = this;
    observable.operator = operator;
    return observable;
  }

  pipe(...operators: Function[]) {
    return pipe(operators)(this);
  }
}

export default Observable;
