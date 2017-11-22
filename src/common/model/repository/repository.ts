import { Maybe } from 'monet';

export interface Identifiable<ID> {
    id: ID;
}

export type RepositoryGet<ID, T extends Identifiable<ID>> = (id: ID) => Maybe<T>;
export type RepositoryStore<ID, T extends Identifiable<ID>> = (x: T) => Maybe<T>;
