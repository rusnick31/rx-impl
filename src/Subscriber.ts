import { Observer } from "./types";
import Subscription from "./Subscription";

class Subscriber<T> extends Subscription implements Observer<T> {
  private isStopped = false;

  constructor(private destination: Observer<T>) {
    super();
  }

  next(value?: T) {
    if (this.isStopped) {
      return;
    }
    this.destination.next(value);
  }

  error() {
    if (this.isStopped) {
      return;
    }
    this.isStopped = true;
    this.destination.error();
  }

  complete() {
    if (this.isStopped) {
      return;
    }
    this.isStopped = true;
    this.destination.complete();
  }

  unsubscribe() {
    this.isStopped = true;
    super.unsubscribe();
  }
}

export default Subscriber;
