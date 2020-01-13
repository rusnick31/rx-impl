import { SchedulerLike } from '../types';
import { Action } from './Action';

export class Scheduler implements SchedulerLike {
  private actions: Action[] = [];
  private pending = false;

  constructor(private ActionCtor: typeof Action) {}

  schedule(work: Function, delay: number, state: any) {
    return new this.ActionCtor(this, work).schedule(delay, state);
  }

  flush(action: Action) {
    if (this.pending) {
      this.actions.push(action);
      return;
    }

    this.pending = true;

    this.actions.push(action);
    const errors = this.actions.map(action => action.execute());

    this.pending = false;

    if (errors.some(Boolean)) {
      this.actions.forEach(action => action.unsubscribe());
    }

    this.actions = [];
  }
}
