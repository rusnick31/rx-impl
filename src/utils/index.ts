export function pipe<T>(fns: Function[]) {
  return (x: T) => fns.reduce((acc, f) => f(acc), x);
}
