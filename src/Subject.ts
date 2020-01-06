import Observable from './Observable';
import { Observer } from './types';
import Subscriber from './Subscriber';

export class Subject<T> extends Observable<T> implements Observer<T> {
  private subscribers: Subscriber<T>[] = [];
  private isStopped = false;

  _subscribe(subscriber: Subscriber<T>) {
    this.subscribers.push(subscriber);
    return () => {
      this.subscribers.filter(subscr => subscr !== subscriber);
    };
  }

  next(value: T) {
    if (this.isStopped) {
      return;
    }
    this.subscribers.forEach(subscriber => subscriber.next(value));
  }

  error() {
    if (this.isStopped) {
      return;
    }
    this.isStopped = true;
    this.subscribers.forEach(subscriber => subscriber.error());
    this.subscribers = [];
  }

  complete() {
    if (this.isStopped) {
      return;
    }
    this.isStopped = true;
    this.subscribers.forEach(subscriber => subscriber.complete());
    this.subscribers = [];
  }
}
