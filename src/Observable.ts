import { Observer, TearDownLogic } from "./types";
import Subscriber from "./Subscriber";
import { pipe } from "~/utils/";

class Observable<T> {
  private source: Observable<T> = null;
  private operator: any = null;

  constructor(private producer?: (observer: Observer<T>) => TearDownLogic) {}

  subscribe(observer: Observer<T>) {
    const sink = new Subscriber(observer);
    const teardown = this.producer(sink);
    sink.add(teardown);
    return sink;
  }

  lift(operator) {
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
