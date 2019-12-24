import { SubscriptionLike, TearDownLogic } from "./types";

class Subscription implements SubscriptionLike {
  public closed = false;

  protected parent: Subscription = null;
  private children: Subscription[] = [];

  constructor(private teardown?: TearDownLogic) {}

  unsubscribe() {
    if (this.closed) {
      return;
    }

    this.closed = true;

    if (this.teardown) {
      this.teardown();
    }

    if (this.parent) {
      this.parent.remove(this);
      this.parent = null;
    }

    this.children.forEach(child => child.unsubscribe());
    this.children = [];
  }

  add(teardown?: TearDownLogic) {
    this.children.push(new Subscription(teardown));
  }

  remove(subsription: Subscription) {
    this.children = this.children.filter(
      childSubscription => childSubscription !== subsription
    );
  }
}

export default Subscription;
