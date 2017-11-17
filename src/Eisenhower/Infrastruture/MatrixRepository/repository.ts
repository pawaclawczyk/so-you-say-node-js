import { Map } from "immutable";

type RepositoryGet<ID, T> = (id: ID) => T;
type RepositoryStory<T> = (x: T) => void;

interface Repository<ID, T> {
    get: RepositoryGet<ID, T>;
    store: RepositoryStory<T>;
}

interface Identifiable<ID> {
    id: ID;
}

class InMemoryRepository<ID, T extends Identifiable<ID>> implements Repository<ID, T> {
    private xs: Map<ID, T>;

    constructor() {
        this.xs = Map();
    }

    public get(id) {
        return this.xs.get(id);
    }

    public store(x) {
        this.xs = this.xs.set(x.id, x);
    }
}
