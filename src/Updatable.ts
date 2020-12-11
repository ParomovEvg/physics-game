export interface Updatable {
  update(fromPrev: number, time: number): void;
}
