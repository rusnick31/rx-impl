import { SubscriptionLike, TearDownLogic } from "./types";
import Subscriber from "./Subscriber";

class Subscription implements SubscriptionLike {
  public closed = false;

  protected parent: Subscription = null;
  private children: Subscription[] = [];

  constructor(private teardown?: () => void) {}

  unsubscribe() {
    if (this.closed) {
      return;
    }
    this.closed = true;

    this._unsubscribe();

    if (this.parent) {
      this.parent.remove(this);
      this.parent = null;
    }

    this.children.forEach(child => child.unsubscribe());
    this.children = [];
  }

  protected _unsubscribe() {
    if (this.teardown) {
      this.teardown();
    }
  }

  add(teardown?: TearDownLogic) {
    if (teardown instanceof Subscriber) {
      teardown.parent = this;
      this.children.push(teardown);
      return;
    }

    this.children.push(new Subscription(teardown as () => void));
  }

  remove(subsription: Subscription) {
    this.children = this.children.filter(
      childSubscription => childSubscription !== subsription
    );
  }
}

export default Subscription;
