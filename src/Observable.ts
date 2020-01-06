import { Observer, TearDownLogic, Operator } from './types';
import { pipe, toSubscriber } from './utils/';
import Subscriber from './Subscriber';

class Observable<T> {
  public source: Observable<T> = null;
  private operator: any = null;

  constructor(
    private producer?: (subscriber: Subscriber<T>) => TearDownLogic,
  ) {}

  subscribe(observer: Observer<T>) {
    const sink = toSubscriber(observer);

    if (this.operator) {
      sink.add(this.operator.call(sink, this.source));
    } else {
      sink.add(this._subscribe(sink));
    }

    return sink;
  }

  protected _subscribe(subscriber: Subscriber<T>) {
    return this.producer(subscriber);
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
