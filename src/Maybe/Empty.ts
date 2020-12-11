import { Maybe } from "./Maybe";

export class Empty implements Maybe<never> {
  private static instance = new Empty();

  static get(): Empty {
    return Empty.instance;
  }

  chain(): Empty {
    return Empty.get();
  }

  default<N>(d: N): N {
    return d;
  }

  map(): Empty {
    return Empty.get();
  }

  unwrap(): undefined {
    return undefined;
  }
}
