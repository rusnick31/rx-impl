import Subscription from '../Subscription';
import { Scheduler } from './Scheduler';

export class Action extends Subscription {
  private delay: number;
  private state: any;
  private id: number;

  constructor(private scheduler: Scheduler, private work: Function) {
    super();
  }

  schedule(delay: number, state: any) {
    this.delay = delay;
    this.state = state;

    this.id = setTimeout(() => this.scheduler.flush(this), delay);
    return this;
  }

  execute() {
    console.log(this.state);
    try {
      this.work(this.state);
    } catch (error) {
      return error;
    }
  }

  /* @override */
  protected _unsubscribe() {
    clearTimeout(this.id);
  }
}
