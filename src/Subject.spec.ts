import { Subject } from './Subject';

describe('Subject', () => {
  it('should call all subsribers', () => {
    const nextMock = jest.fn();

    class A {
      constructor(public a: string) {}
    }

    const a = new A('asd');

    const subject = new Subject();
    const subscriber = subject.subscribe({
      next: nextMock,
    });
    subject.subscribe({
      next: nextMock,
    });
    subject.next(10);
    subscriber.unsubscribe();
    subject.next(11);

    expect(nextMock).toBeCalledTimes(3);
    expect(nextMock).toHaveBeenLastCalledWith(11);
  });
});
