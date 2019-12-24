export interface SubscriptionLike {
  readonly closed: boolean;
  unsubscribe: () => void;
}

export interface Observer<T> {
  next(value?: T): void;
  error(): void;
  complete(): void;
}

// export interface Observable<T> {
//   subscribe: (observer: Observer<T>) => SubscriptionLike;
// }

export type TearDownLogic = () => void;