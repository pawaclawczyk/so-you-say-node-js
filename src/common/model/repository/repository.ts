import { Maybe } from 'monet';

export interface Identifiable<ID> {
    id: ID;
}

export interface Repository<ID, T extends Identifiable<ID>> {
    get: (id: ID) => Maybe<T>;
    store: (x: T) => Maybe<T>;
}

// Repository => ID => Maybe<T>
export const getFromRepository =
    <ID, T extends Identifiable<ID>>(r: Repository<ID, T>) => (id: ID): Maybe<T> => r.get(id);

// Repository => T => Maybe<T>
export const storeInRepository =
    <ID, T extends Identifiable<ID>>(r: Repository<ID, T>) => (x: T): Maybe<T> => r.store(x);
