import Observable from "./Observable";

const obs = new Observable(observer => {
  let count = 0;
  const id = setInterval(() => observer.next(count++), 1000);
  return () => {
    clearInterval(id);
  };
});

window.obs = obs;
