export class GameLoop {
  constructor(private callbacks: FrameRequestCallback[] = []) {}

  private loopId = 0;

  start() {
    this.loopId = window.requestAnimationFrame(this.main);
  }

  stop() {
    window.cancelAnimationFrame(this.loopId);
  }

  main: FrameRequestCallback = t => {
    window.requestAnimationFrame(this.main);
    const len = this.callbacks.length;
    for (let i = 0; i !== len; i++) {
      this.callbacks[i](t);
    }
  };

  subscribe(cb: FrameRequestCallback) {
    const set = new Set(this.callbacks);
    set.add(cb);
    this.callbacks = Array.from(set);
  }

  unsubscribe(cb: FrameRequestCallback) {
    const set = new Set(this.callbacks);
    set.delete(cb);
    this.callbacks = Array.from(set);
  }
}
