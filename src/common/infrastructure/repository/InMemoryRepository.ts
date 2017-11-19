import { Map } from "immutable";
import { Maybe } from "monet";
import { Identifiable, Repository } from "../../model/repository/repository";

export class InMemoryRepository<ID, T extends Identifiable<ID>> implements Repository<ID, T> {
    private xs: Map<ID, T>;

    constructor() {
        this.xs = Map();
    }

    public get(id: ID) {
        return Maybe.fromNull(this.xs.get(id, undefined));
    }

    public store(x: T) {
        this.xs = this.xs.set(x.id, x);
    }
}
