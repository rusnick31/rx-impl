import Subscriber from "./Subscriber";

class InnerSubscriber<T> extends Subscriber<T> {
  _error() {
    this.destination.error();
    this.unsubscribe();
  }

  _complete() {
    this.destination.complete();
    this.unsubscribe();
  }
}

export default InnerSubscriber;
