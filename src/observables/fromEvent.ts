import Observable from "../Observable";

export function fromEvent(element: HTMLElement, eventType: string) {
  return new Observable<Event>(subscriber => {
    const handler = (event: Event) => subscriber.next(event);

    element.addEventListener(eventType, handler);
    return () => element.removeEventListener(eventType, handler);
  });
}
