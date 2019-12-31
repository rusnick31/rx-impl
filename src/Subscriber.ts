import { Observer } from "./types";
import Subscription from "./Subscription";

class Subscriber<T> extends Subscription implements Observer<T> {
  private isStopped = false;

  constructor(protected destination: Observer<any> | Subscriber<any>) {
    super();
  }

  next(value?: T) {
    if (this.isStopped) {
      return;
    }
    this._next(value);
  }

  error() {
    if (this.isStopped) {
      return;
    }
    this.isStopped = true;
    this._error();
  }

  complete() {
    if (this.isStopped) {
      return;
    }
    this.isStopped = true;
    this._complete();
  }

  _next(value?: T) {
    this.destination.next(value);
  }

  _error() {
    this.destination.error();
  }

  _complete() {
    this.destination.complete();
  }

  unsubscribe() {
    this.isStopped = true;
    super.unsubscribe();
  }
}

export default Subscriber;
