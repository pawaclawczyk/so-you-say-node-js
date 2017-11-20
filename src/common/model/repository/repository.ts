import { Maybe } from 'monet';

export interface Repository<ID, T> {
    get: (id: ID) => Maybe<T>;
    store: (x: T) => Maybe<T>;
}

export interface Identifiable<ID> {
    id: ID;
}

export const getFromRepository = <ID, T>(r: Repository<ID, T>) => (id: ID): Maybe<T> => r.get(id);
export const storeInRepository = <ID, T>(r: Repository<ID, T>) => (x: T): Maybe<T> => r.store(x);
