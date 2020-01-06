import { ConnectableObservable } from '../ConnectableObservable';
import { OperatorFunction, Operator } from '../types';
import Subscriber from '../Subscriber';

export function refCount<T>(): OperatorFunction<T, T> {
  return (connectable: ConnectableObservable<T>) => {
    return connectable.lift(new RefCountOperator<T>());
  };
}

class RefCountOperator<T> implements Operator<T, T> {
  call(subscriber: Subscriber<T>, source: ConnectableObservable<T>) {
    const refCountSubscriber = source.subscribe(
      new RefCountSubscriber<T>(subscriber, source),
    );
    source.connect();
    source.refCount = source.refCount + 1;
    return refCountSubscriber;
  }
}

class RefCountSubscriber<T> extends Subscriber<T> {
  constructor(
    subscriber: Subscriber<T>,
    private connectable: ConnectableObservable<T>,
  ) {
    super(subscriber);
  }

  _unsubscribe() {
    const { connectable } = this;
    connectable.refCount = connectable.refCount - 1;
    if (connectable.refCount === 0) {
      connectable.subscription.unsubscribe();
    }
  }
}
