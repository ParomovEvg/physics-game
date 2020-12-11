import {Maybe} from "./Maybe";

export class Result<T> implements Maybe<T> {
    constructor(private value: T) {
    }

    static of<T>(v: T) {
        return new Result(v);
    }

    chain<N>(fn: (e: T) => Maybe<N>): Maybe<N> {
        return fn(this.value);
    }

    map<N>(fn: (e: T) => N): Result<N> {
        return Result.of(fn(this.value));
    }

    unwrap(): T {
        return this.value;
    }

    default(): T {
        return this.value;
    }
}