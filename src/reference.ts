import { fromEvent, interval } from "rxjs";
import { switchMap } from "rxjs/operators";

fromEvent(document.getElementById("test-button"), "click")
  .pipe(switchMap(() => interval(1000)))
  .subscribe({
    next: value => console.log(value)
  });
