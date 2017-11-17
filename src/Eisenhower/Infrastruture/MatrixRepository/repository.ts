import { Map } from "immutable";
import { Maybe } from "monet";

export type RepositoryGet<ID, T> = (id: ID) => Maybe<T>;
export type RepositoryStory<T> = (x: T) => void;

export interface Repository<ID, T> {
    get: RepositoryGet<ID, T>;
    store: RepositoryStory<T>;
}

export interface Identifiable<ID> {
    id: ID;
}

export class InMemoryRepository<ID, T extends Identifiable<ID>> implements Repository<ID, T> {
    private xs: Map<ID, T>;

    constructor() {
        this.xs = Map();
    }

    public get(id) {
        return Maybe.fromNull(this.xs.get(id, undefined));
    }

    public store(x) {
        this.xs = this.xs.set(x.id, x);
    }
}
