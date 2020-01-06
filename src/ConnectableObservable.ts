import Observable from './Observable';
import Subscriber from './Subscriber';
import { Subject } from './Subject';
import Subscription from './Subscription';

export class ConnectableObservable<T> extends Observable<T> {
  private subject: Subject<T>;
  public subscription: Subscription;
  public refCount = 0;

  constructor(
    public source: Observable<T>,
    private subjectFactory: () => Subject<T>,
  ) {
    super();
  }

  getSubject() {
    return this.subject || (this.subject = this.subjectFactory());
  }

  _subscribe(subscriber: Subscriber<T>) {
    return this.getSubject().subscribe(subscriber);
  }

  connect() {
    if (this.subscription) {
      return this.subscription;
    }

    this.subscription = this.source.subscribe(this.subject);
    return this.subscription;
  }
}
